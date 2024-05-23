// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
class Exam {
  constructor(
    userId: string,
    questionIds: Array<string>,
    responses: Array<number>,
    date: Date,
    completed: boolean,
    id?: ObjectId
  ) {}
}

interface ExamType {
  userId: string;
  questionIds: Array<string>;
  responses: Array<number>;
  date: Date;
  completed: boolean;
  _id?: ObjectId;
}

export default Exam;

export { ExamType };
