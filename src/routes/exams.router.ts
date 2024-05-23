// External Dependencies
import express from "express";
import { createExam } from "../controllers/exams.controller";
import { requireAuth } from "../middlewares/auth.middleware";

// Global Config
const examsRouter = express.Router();

examsRouter.use(express.json());

examsRouter.post("/create", requireAuth, createExam);

export { examsRouter };
