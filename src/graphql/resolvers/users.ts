import { collections } from "../../services/database.service";
import User, { UserType } from "../../models/User";
import { createSecretToken } from "../../utils/jwtToken";

import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { GraphQLError } from "graphql";

async function getUsers() {
  try {
    const users = (await collections?.users?.find({}).toArray()) as UserType[];

    return users;
  } catch (error) {
    throw new GraphQLError((error as any).message, {
      extensions: {
        code: (error as any).message,
        http: {
          status: 500,
        },
      },
    });
  }
}

export { getUsers };
