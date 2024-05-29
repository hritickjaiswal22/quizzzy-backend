const typeDefs = `
type User {
  email: String!
  password: String
  name: String
  _id: ID!
}

type AuthResponse {
  email: String
  token: String
  userId: String
}

type Mutation {
  signup(email: String!,password: String!): AuthResponse
  signin(email: String!,password: String!): AuthResponse
}

type Query {
  hello: String
  getAllUsers: [User]
}
`;

export { typeDefs };
