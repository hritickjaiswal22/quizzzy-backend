// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
class User {
  constructor(
    email: string,
    password: string,
    date: Date,
    score: number,
    name?: string,
    id?: ObjectId
  ) {}
}

interface UserType {
  email: string;
  password: string;
  date: Date;
  score: number;
  name?: string;
  _id?: ObjectId;
}

export default User;

export { UserType };
