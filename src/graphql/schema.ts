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

type Query {
  hello: String
  getAllUsers: [User]
  signup(email: String!,password: String!): AuthResponse
}
`;

export { typeDefs };
