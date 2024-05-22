// External Dependencies
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/User";

async function getUsers(_req: Request, res: Response) {
  try {
    const users = (await collections?.users?.find({}).toArray()) as User[];

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send((error as any).message);
  }
}

export { getUsers };
