// External Dependencies
import { Request, Response } from "express";
import { collections } from "../services/database.service";
import Exam from "../models/Exam";

async function createExam(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    const result = await collections?.exams?.insertOne({
      userId,
      questionIds: [],
      responses: [],
      date: new Date(),
      completed: false,
    });

    if (result) {
      console.log(
        `A document was inserted with the _id: ${result?.insertedId}`
      );

      return res.status(201).send({
        message: "Created an exam",
        success: true,
        user: {
          examId: result?.insertedId,
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

export { createExam };
