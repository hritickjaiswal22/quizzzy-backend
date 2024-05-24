// External Dependencies
import express from "express";
import { createExam, answerExam } from "../controllers/exams.controller";
import { requireAuth } from "../middlewares/auth.middleware";

// Global Config
const examsRouter = express.Router();

examsRouter.use(express.json());

examsRouter.post("/create", requireAuth, createExam);
examsRouter.put("/answer", requireAuth, answerExam);

export { examsRouter };
