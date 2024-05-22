// External Dependencies
import express from "express";
import { getUsers } from "../controllers/users.controller";
import { requireAuth } from "../middlewares/auth.middleware";

// Global Config
const usersRouter = express.Router();

usersRouter.use(express.json());

// GET
usersRouter.get("/", requireAuth, getUsers);

// POST

// PUT

// DELETE

export { usersRouter };
