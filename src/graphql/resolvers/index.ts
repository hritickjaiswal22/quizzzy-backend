// External Dependencies
import { getUsers } from "./users";
import { register, login } from "./auth";

const resolvers = {
  Query: {
    hello: () => `Hello from graphql resolver`,
    getAllUsers: (_: any) => getUsers(),
  },

  Mutation: {
    signup: (_: any, { email, password }: any) => register(email, password),
    signin: (_: any, { email, password }: any) => login(email, password),
  },
};

export { resolvers };
