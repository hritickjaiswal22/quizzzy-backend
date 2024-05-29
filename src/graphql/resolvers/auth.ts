import { collections } from "../../services/database.service";
import { UserType } from "../../models/User";
import { createSecretToken } from "../../utils/jwtToken";

import * as bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

const saltRounds = 10;

function validateRegisterInput(email: string, password: string) {
  return email.length && password.length;
}

function validateLoginInput(email: string, password: string) {
  return email.length && password.length;
}

function throwError(message: string, status: number) {
  throw new GraphQLError(message, {
    extensions: {
      code: message,
      http: {
        status,
      },
    },
  });
}

async function register(email: string, password: string) {
  try {
    const isValid = validateRegisterInput(email, password);

    if (!isValid) {
      throwError("Invalid Input", 400);
    }

    const existingUser = (await collections?.users
      ?.find({ email })
      .toArray()) as UserType[];

    if (existingUser.length) {
      throwError("User already exists", 409);
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      const result = await collections?.users?.insertOne({
        email,
        password: hash,
        date: new Date(),
      });

      if (result) {
        const token = createSecretToken(result.insertedId.id.toString());

        return {
          email,
          token,
          userId: result?.insertedId,
        };
      } else {
        throwError("Internal server error", 500);
      }
    }
  } catch (error) {
    throwError((error as any).message, 500);
  }
}

export { register };
