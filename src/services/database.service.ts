// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
const collections: {
  users?: mongoDB.Collection;
  exams?: mongoDB.Collection;
  questions?: mongoDB.Collection;
} = {};

// Initialize Connection
async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_URI || ""
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const usersCollection: mongoDB.Collection = db.collection(
    process.env.USERS_COLLECTION_NAME || ""
  );
  const examsCollection: mongoDB.Collection = db.collection(
    process.env.EXAMS_COLLECTION_NAME || ""
  );
  const questionsCollection: mongoDB.Collection = db.collection(
    process.env.QUESTIONS_COLLECTION_NAME || ""
  );

  collections.users = usersCollection;
  collections.exams = examsCollection;
  collections.questions = questionsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );
}

export { collections, connectToDatabase };
