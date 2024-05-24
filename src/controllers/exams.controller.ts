// External Dependencies
import { collections } from "../services/database.service";
import Exam, { ExamType } from "../models/Exam";
import Question, { QuestionType } from "../models/Question";

import { ObjectId } from "mongodb";
import { Request, Response } from "express";

const TOTAL_QUESTIONS = 5;

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

async function createExam(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    const result = await collections?.exams?.insertOne({
      userId,
      questionIds: [],
      date: new Date(),
      score: 0,
      completed: false,
    });

    if (result) {
      const firstQuestion = await getNextQuestion(1, []);

      const { correctOptionIndex, ...question } = firstQuestion as QuestionType;

      (question as any).id = question._id?.toString();
      delete question._id;

      return res.status(201).send({
        message: "Created an exam",
        success: true,
        exam: {
          examId: result?.insertedId,
          nextQuestion: question,
        },
      });
    } else {
      return res.status(500).send({
        message: "Couldn't create an exam",
        success: false,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: (error as any).message, success: false });
  }
}

async function answerExam(req: Request, res: Response) {
  try {
    const { examId, questionId, selectedIndex } = req.body;

    const examQuery = { _id: new ObjectId(examId) };
    const questionQuery = { _id: new ObjectId(questionId) };

    const chosenExam = (await collections?.exams
      ?.find(examQuery)
      .toArray()) as ExamType[];
    const prevQuestion = (await collections?.questions
      ?.find(questionQuery)
      .toArray()) as QuestionType[];

    if (!chosenExam.length || !prevQuestion.length) {
      return res.status(400).send({ message: "Invalid input", success: false });
    }

    let nextDifficulty = 1;
    const updatedChosenExam: ExamType = { ...chosenExam[0] };
    updatedChosenExam.questionIds = [
      ...updatedChosenExam.questionIds,
      questionId,
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
      return res.status(200).send({
        message: "Submission completed",
        success: true,
        completed: true,
      });
    }

    const { correctOptionIndex, ...nextQuestion } = await getNextQuestion(
      nextDifficulty,
      updatedChosenExam.questionIds
    );
    nextQuestion.id = (nextQuestion as QuestionType)._id?.toString();
    delete (nextQuestion as QuestionType)._id;

    return res.status(200).send({
      message: "Submission completed",
      success: true,
      nextQuestion,
      completed: false,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: (error as any).message, success: false });
  }
}

export { createExam, answerExam };
