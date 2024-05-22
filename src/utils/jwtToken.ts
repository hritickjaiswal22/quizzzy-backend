import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

dotenv.config();

function createSecretToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_TOKEN_KEY || "", {
    expiresIn: 3 * 24 * 60 * 60,
  });
}

export { createSecretToken };
