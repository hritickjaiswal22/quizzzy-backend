// External Dependencies
import { collections } from "../services/database.service";

import { Request, Response } from "express";

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

export { postQuestions };
