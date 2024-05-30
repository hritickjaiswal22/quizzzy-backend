import { collections } from "../../services/database.service";
import { throwError } from "./getGraphqlError";
import { QuestionType } from "../../models/Question";

import { ObjectId } from "mongodb";

async function getNextQuestion(
  difficulty: number,
  answeredQuestionsIds: Array<string>
) {
  try {
    const excludeIds = answeredQuestionsIds.map(
      (id: string) => new ObjectId(id)
    );

    const nextQuestion = await collections?.questions
      ?.aggregate([
        {
          $match: {
            difficulty,
            _id: { $nin: excludeIds }, // Exclude documents with IDs in excludeIds
          },
        },
        { $sample: { size: 1 } }, // Randomly select one document
      ])
      .toArray();

    if (nextQuestion?.length) {
      return nextQuestion[0];
    } else {
      throw new Error("Failed to find new question");
    }
  } catch (error) {
    throw error;
  }
}

async function createExam(context: any) {
  try {
    if (!context || !context.user) throwError("User is not authenticated", 401);

    const userId = context.user._id.toString();

    const result = await collections?.exams?.insertOne({
      userId,
      questionIds: [],
      responseIndices: [],
      date: new Date(),
      score: 0,
      completed: false,
    });

    if (result) {
      const firstQuestion = await getNextQuestion(1, []);

      const { correctOptionIndex, ...question } = firstQuestion as QuestionType;

      return {
        examId: result?.insertedId,
        nextQuestion: question,
      };
    } else {
      throwError("Couldn't create an exam", 500);
    }
  } catch (error) {
    throwError((error as any).message, 500);
  }
}

export { createExam };
