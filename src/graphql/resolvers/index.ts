// External Dependencies
import { getUsers } from "./users";
import { register } from "./auth";

const resolvers = {
  Query: {
    hello: () => `Hello from graphql resolver`,
    getAllUsers: (_: any) => getUsers(),
    signup: (_: any, { email, password }: any) => register(email, password),
  },
};

export { resolvers };
