// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
class Question {
  constructor(
    text: string,
    options: Array<string>,
    correctOptionIndex: number,
    difficulty: number,
    id?: ObjectId
  ) {}
}

interface QuestionType {
  text: string;
  options: Array<string>;
  correctOptionIndex: number;
  difficulty: number;
  _id?: ObjectId;
}

export default Question;

export { QuestionType };
