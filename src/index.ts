import express, { Express } from "express";
import expressSession from "express-session";
import passport from "passport";
import * as dotenv from "dotenv";
import cookieSession from "cookie-session";

import { connectToDatabase } from "./services/database.service";
import { usersRouter } from "./routes/users.router";
import { authsRouter } from "./routes/auths.router";
import { examsRouter } from "./routes/exams.router";
// import { questionsRouter } from "./routes/questions.router";
import "./configs/passport";

import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: process.env.FRONT_END_DOMAIN || "http://localhost:5173", // Your frontend's domain
  credentials: true, // Enable sending of cookies
};

// setting up cookieSession
// app.use(
//   cookieSession({
//     maxAge: 3 * 24 * 60 * 60,
//     keys: [process.env.COOKIE_KEY || "abc"],
//   })
// );

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET || "abc",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      secure: true, //Enable when deployment OR when not using localhost, this wont work without https
      sameSite: "none", //Enable when deployment OR when not using localhost, We're not on the same site, we're using different site so the cookie need to effectively transfer from Backend to Frontend
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

connectToDatabase()
  .then(() => {
    app.use("/users", usersRouter);
    app.use("/auths", authsRouter);
    app.use("/exams", examsRouter);
    // app.use("/questions", questionsRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
