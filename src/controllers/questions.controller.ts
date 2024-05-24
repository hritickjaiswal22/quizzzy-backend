// External Dependencies
import { collections } from "../services/database.service";

import { Request, Response } from "express";
import { ObjectId } from "mongodb";

async function postQuestions(req: Request, res: Response) {
  try {
    const { questions } = req.body;

    const result = await collections?.questions?.insertMany(questions);

    if (result) {
      return res.status(201).send({
        message: "Seeded questions",
        success: true,
      });
    } else {
      return res
        .status(500)
        .send({ message: "Operation failed", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: (error as any).message, success: false });
  }
}

async function getRandomQuestion(req: Request, res: Response) {
  try {
    const { difficulty, answeredQuestionsIds } = req.body;

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

    if (nextQuestion) {
      return res.status(200).send({
        message: "Next question",
        success: true,
        nextQuestion,
      });
    } else {
      return res
        .status(500)
        .send({ message: "Operation failed", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: (error as any).message, success: false });
  }
}

export { postQuestions, getRandomQuestion };
