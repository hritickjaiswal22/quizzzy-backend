// External Dependencies
import { register, login } from "../controllers/auths.controller";

import express from "express";
import passport from "passport";

// Global Config
const authsRouter = express.Router();

authsRouter.use(express.json());

// Signup via email and password
authsRouter.post("/register", register);

// Login via email and password
authsRouter.post("/login", login);

//
authsRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

authsRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    console.log("Inside auth.router.ts");

    console.log(req.user);

    res.cookie("email", (req?.user as any)?.email || "");
    res.cookie("token", (req?.user as any)?.token || "");
    res.cookie("userId", (req?.user as any)?.userId || "");

    // Successful authentication, redirect to the frontend.
    res.redirect("http://localhost:5173/redirect");
  }
);

export { authsRouter };
