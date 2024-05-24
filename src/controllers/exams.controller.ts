// External Dependencies
import { collections } from "../services/database.service";
import Exam from "../models/Exam";
import Question, { QuestionType } from "../models/Question";

import { ObjectId } from "mongodb";
import { Request, Response } from "express";

async function createExam(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    const result = await collections?.exams?.insertOne({
      userId,
      questionIds: [],
      responses: [],
      date: new Date(),
      score: 0,
      completed: false,
    });

    if (result) {
      const firstQuestion = (await collections?.questions
        ?.find({ difficulty: 1 })
        .toArray()) as Question[];

      if (!firstQuestion.length) {
        return res.status(500).send({
          message: "Unknown issue.Try again",
          success: false,
        });
      }

      const { correctOptionIndex, ...question } =
        firstQuestion[0] as QuestionType;

      (question as any).id = question._id?.toString();
      delete question._id;

      return res.status(201).send({
        message: "Created an exam",
        success: true,
        user: {
          examId: result?.insertedId,
          question,
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

    const chosenExam = (await collections?.exams
      ?.find(examQuery)
      .toArray()) as Exam[];

    if (!chosenExam.length) {
      return res.status(400).send({ message: "Invalid input", success: false });
    }

    return res.status(201).send({
      message: "Submission completed",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: (error as any).message, success: false });
  }
}

export { createExam, answerExam };
