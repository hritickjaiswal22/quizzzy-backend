import { collections } from "../../services/database.service";
import { throwError } from "./getGraphqlError";
import { QuestionType } from "../../models/Question";
import { ExamType } from "../../models/Exam";

import { ObjectId } from "mongodb";

const TOTAL_QUESTIONS = 20;

async function getNextQuestion(
  difficulty: number,
  answeredQuestionsIds: Array<string>
): Promise<QuestionType> {
  try {
    const excludeIds = answeredQuestionsIds.map(
      (id: string) => new ObjectId(id)
    );

    const nextQuestion = (await collections?.questions
      ?.aggregate([
        {
          $match: {
            difficulty,
            _id: { $nin: excludeIds }, // Exclude documents with IDs in excludeIds
          },
        },
        { $sample: { size: 1 } }, // Randomly select one document
      ])
      .toArray()) as QuestionType[];

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

async function answerExam(obj: any) {
  const { context, examId, questionId, selectedIndex } = obj;
  try {
    if (!context || !context.user) throwError("User is not authenticated", 401);
    if (!examId || !questionId || typeof selectedIndex !== "number")
      throwError("Invalid input", 404);

    const examQuery = { _id: new ObjectId(examId) };
    const questionQuery = { _id: new ObjectId(questionId) };

    const chosenExam = (await collections?.exams
      ?.find(examQuery)
      .toArray()) as ExamType[];
    const prevQuestion = (await collections?.questions
      ?.find(questionQuery)
      .toArray()) as QuestionType[];

    if (
      !chosenExam.length ||
      !prevQuestion.length ||
      chosenExam[0].completed ||
      chosenExam[0].questionIds.length === TOTAL_QUESTIONS
    )
      throwError("Invalid input", 400);

    // Deciding difficulty for next question
    let nextDifficulty = 1;
    const updatedChosenExam: ExamType = { ...chosenExam[0] };
    updatedChosenExam.questionIds = [
      ...updatedChosenExam.questionIds,
      questionId,
    ];
    updatedChosenExam.responseIndices = [
      ...updatedChosenExam.responseIndices,
      Number(selectedIndex),
    ];
    if (selectedIndex === prevQuestion[0].correctOptionIndex) {
      updatedChosenExam.score += prevQuestion[0].difficulty;

      nextDifficulty = prevQuestion[0].difficulty + 1;
    } else {
      nextDifficulty = prevQuestion[0].difficulty - 1;
    }

    if (nextDifficulty > 3) nextDifficulty = 3;
    if (nextDifficulty < 1) nextDifficulty = 1;
    if (updatedChosenExam.questionIds.length === TOTAL_QUESTIONS) {
      updatedChosenExam.completed = true;
    }

    const examUpdateResult = await collections?.exams?.updateOne(examQuery, {
      $set: updatedChosenExam,
    });

    if (updatedChosenExam.questionIds.length === TOTAL_QUESTIONS) {
      return {
        message: "Submission completed",
        success: true,
        completed: true,
      };
    }

    const { correctOptionIndex, ...nextQuestion } = await getNextQuestion(
      nextDifficulty,
      updatedChosenExam.questionIds
    );

    return {
      message: "Submission completed",
      success: true,
      nextQuestion,
      completed: false,
    };
  } catch (error) {
    throwError((error as any).message, 500);
  }
}

async function examResult(examId: string, context: any) {
  try {
    if (!context || !context.user) throwError("User is not authenticated", 401);

    const examQuery = { _id: new ObjectId(examId) };

    const chosenExam = (await collections?.exams
      ?.find(examQuery)
      .toArray()) as ExamType[];

    if (!chosenExam.length) throwError("Invalid input", 400);

    const objectIds = chosenExam[0].questionIds.map((id) => new ObjectId(id));

    const questions = await collections?.questions
      ?.find({ _id: { $in: objectIds } }, { projection: { _id: 0 } })
      .toArray();

    const { questionIds, ...exam } = chosenExam[0];

    return {
      message: "Succesfully generatad exam Result",
      success: true,
      questions,
      exam,
    };
  } catch (error) {
    throwError((error as any).message, 500);
  }
}

async function getUserExams(context: any) {
  try {
    if (!context || !context.user) throwError("User is not authenticated", 401);

    const userId = context.user._id.toString();

    const examQuery = { userId };

    const userExams = (await collections?.exams
      ?.find(examQuery)
      .toArray()) as ExamType[];

    return {
      message: "Succesfully found all user exams",
      success: true,
      exams: userExams,
    };
  } catch (error) {
    throwError((error as any).message, 500);
  }
}

export { createExam, answerExam, examResult, getUserExams };
