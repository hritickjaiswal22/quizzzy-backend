// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
class Exam {
  constructor(
    userId: string,
    questionIds: Array<string>,
    responseIndices: Array<number>,
    date: Date,
    score: number,
    completed: boolean,
    id?: ObjectId
  ) {}
}

interface ExamType {
  userId: string;
  questionIds: Array<string>;
  responseIndices: Array<number>;
  date: Date;
  score: number;
  completed: boolean;
  _id?: ObjectId;
}

export default Exam;

export { ExamType };
