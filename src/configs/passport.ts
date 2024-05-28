import passport from "passport";
import passportGoogle from "passport-google-oauth2";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";

import { collections } from "../services/database.service";
import User, { UserType } from "../models/User";
import { createSecretToken } from "../utils/jwtToken";

dotenv.config();

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "https://quizzzy-backend.onrender.com/auths/google",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0].value;

      console.log(`Inside passport GoogleStrategy ${email}`);

      const existingUser = (await collections?.users
        ?.find({ email })
        .toArray()) as UserType[];

      // If user doesn't exist creates a new user. (similar to sign up)
      if (!existingUser.length) {
        const result = await collections?.users?.insertOne({
          email,
          password: "",
          date: new Date(),
          googleId: profile.id,
        });

        const arr = (await collections?.users
          ?.find({ email })
          .toArray()) as UserType[];

        const { _id, ...rest } = arr[0];
        const token = createSecretToken(_id?.toString() || "");

        if (result) {
          done(null, {
            email,
            token,
            userId: _id?.toString(),
          });
        }
      } else {
        const { _id, ...rest } = existingUser[0];
        const token = createSecretToken(_id?.toString() || "");

        done(null, {
          email,
          token: token,
          userId: _id?.toString(),
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as any).userId.toString());
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections?.users
      ?.find(query)
      .toArray()) as UserType[];

    done(null, user[0]);
  } catch (error) {
    done(new Error(`Couldn't find user with id ${id}`));
  }
});
