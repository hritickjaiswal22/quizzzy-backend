// External Dependencies
import { getUsers } from "./users";
import { register, login } from "./auth";
import { createExam } from "./exams";

const resolvers = {
  Query: {
    hello: () => `Hello from graphql resolver`,
    getAllUsers: (_: any) => getUsers(),
  },

  Mutation: {
    signup: (_: any, { email, password }: any) => register(email, password),
    signin: (_: any, { email, password }: any) => login(email, password),
    newQuiz: (_: any, __: any, context: any) => createExam(context),
  },
};

export { resolvers };
