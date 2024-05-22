// External Dependencies
import express from "express";
import { getUsers } from "../controllers/users.controller";

// Global Config
const usersRouter = express.Router();

usersRouter.use(express.json());

// GET
usersRouter.get("/", getUsers);

// POST

// PUT

// DELETE

export { usersRouter };
