// External Dependencies
import express from "express";
import { register, login } from "../controllers/auths.controller";

// Global Config
const authsRouter = express.Router();

authsRouter.use(express.json());

// Signup via email and password
authsRouter.post("/register", register);

// Login via email and password
authsRouter.post("/login", login);

export { authsRouter };
