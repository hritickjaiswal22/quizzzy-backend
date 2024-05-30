import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";

import { collections } from "../../services/database.service";

dotenv.config();

interface Context {
  req: Request;
}

const requireAuth = async (context: Context) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader) {
    return null;
  }
  const token = authHeader?.split(" ")[1];

  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY || "");

    if (!decodedToken) return null;
    else {
      const query = { _id: new ObjectId((decodedToken as any)?.id) };

      const existingUser = await collections?.users?.find(query).toArray();

      if (existingUser?.length) return existingUser[0];
      else return null;
    }
  } else {
    return null;
  }
};

export { requireAuth };
