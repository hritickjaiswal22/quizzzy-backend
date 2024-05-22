import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const requireAuth = (req: Request, res: Response, next: Function) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken?.split(" ")[1];

  console.log(token?.split(" ")[1]);

  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN_KEY || "", (err, decodedToken) => {
      if (err || !decodedToken) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        // req.userId = (decodedToken as any).id;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

export { requireAuth };
