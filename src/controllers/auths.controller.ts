// External Dependencies
import { Request, Response } from "express";
import { collections } from "../services/database.service";
import User, { UserType } from "../models/User";
import * as bcrypt from "bcrypt";
import { createSecretToken } from "../utils/jwtToken";

const saltRounds = 10;

function validateRegisterInput(email: string, password: string) {
  return email.length && password.length;
}

function validateLoginInput(email: string, password: string) {
  return email.length && password.length;
}

async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const isValid = validateRegisterInput(email, password);

    if (!isValid) {
      return res.status(400).send({ message: "Invalid input", success: false });
    }

    const existingUser = (await collections?.users
      ?.find({ email })
      .toArray()) as User[];

    if (existingUser.length) {
      return res
        .status(409)
        .send({ message: "User already exists", success: false });
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      const result = await collections?.users?.insertOne({
        email,
        password: hash,
        date: new Date(),
      });

      if (result) {
        console.log(
          `A document was inserted with the _id: ${result?.insertedId}`
        );

        const token = createSecretToken(result.insertedId.id.toString());
        res.cookie("token", token, {
          httpOnly: false,
        });

        return res.status(201).send({
          message: "User signed in successfully",
          success: true,
          result,
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: (error as any).message, success: false });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const isValid = validateLoginInput(email, password);

    if (!isValid) {
      return res.status(400).send({ message: "Invalid input", success: false });
    }

    const existingUser = (await collections?.users
      ?.find({ email })
      .toArray()) as User[];

    if (!existingUser.length) {
      return res
        .status(401)
        .send({ message: "User does not exists", success: false });
    }

    const { password: hashedPassword, _id } = existingUser[0] as UserType;

    const auth = await bcrypt.compare(password, hashedPassword);

    if (!auth) {
      return res
        .status(401)
        .send({ message: "Incorrect password or email", success: false });
    }

    const token = createSecretToken(_id?.toString() || "");
    res.cookie("token", token, {
      httpOnly: false,
    });

    return res.status(200).send({
      message: "User signed in successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: (error as any).message, success: false });
  }
}

export { register, login };
