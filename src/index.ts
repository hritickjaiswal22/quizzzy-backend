import express, { Express } from "express";
import { connectToDatabase } from "./services/database.service";
import { usersRouter } from "./routes/users.router";
import { authsRouter } from "./routes/auths.router";
import { examsRouter } from "./routes/exams.router";
// import { questionsRouter } from "./routes/questions.router";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend's domain
  credentials: true, // Enable sending of cookies
};

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

connectToDatabase()
  .then(() => {
    app.use("/users", usersRouter);
    app.use("/auths", authsRouter);
    app.use("/exams", examsRouter);
    // app.use("/questions", questionsRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
