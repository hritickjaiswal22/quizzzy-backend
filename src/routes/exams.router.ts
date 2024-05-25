// External Dependencies
import express from "express";
import {
  createExam,
  answerExam,
  examResult,
  getUserExams,
} from "../controllers/exams.controller";
import { requireAuth } from "../middlewares/auth.middleware";

// Global Config
const examsRouter = express.Router();

examsRouter.use(express.json());

examsRouter.post("/create", requireAuth, createExam);
examsRouter.put("/answer", requireAuth, answerExam);
examsRouter.get("/results/:examId", requireAuth, examResult);
examsRouter.get("/history/:userId", requireAuth, getUserExams);

export { examsRouter };
