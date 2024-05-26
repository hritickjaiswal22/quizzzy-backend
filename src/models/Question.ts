// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
class Question {
  constructor(
    text: string,
    options: Array<string>,
    correctOptionIndex: number,
    difficulty: number,
    tags: Array<string>,
    id?: ObjectId
  ) {}
}

interface QuestionType {
  text: string;
  options: Array<string>;
  correctOptionIndex: number;
  difficulty: number;
  tags: Array<string>;
  _id?: ObjectId;
}

export default Question;

export { QuestionType };
