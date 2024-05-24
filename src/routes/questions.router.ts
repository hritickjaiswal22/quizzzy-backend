// External Dependencies
import express from "express";
import {
  postQuestions,
  getRandomQuestion,
} from "../controllers/questions.controller";
import { requireAuth } from "../middlewares/auth.middleware";

// Global Config
const questionsRouter = express.Router();

questionsRouter.use(express.json());

questionsRouter.post("/seed", requireAuth, postQuestions);
questionsRouter.get("/nextQuestion", requireAuth, getRandomQuestion);

export { questionsRouter };
