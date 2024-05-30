import { GraphQLError } from "graphql";

function throwError(message: string, status: number) {
  throw new GraphQLError(message, {
    extensions: {
      code: status,
      http: {
        status,
      },
    },
  });
}

export { throwError };
