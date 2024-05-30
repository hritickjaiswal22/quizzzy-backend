const typeDefs = `
type User {
  email: String!
  password: String
  name: String
  _id: ID!
}

type Exam {
  userId: String!
  questionIds: [String]
  responseIndices: [Int]
  score: Int!
  completed: Boolean!
  _id: ID!
}

type Question {
  text: String
  options: [String]
  correctOptionIndex: Int
  difficulty: Int
  tags: [String]
  _id: ID!
}

type ClientQuestionResponse {
  text: String
  options: [String]
  difficulty: Int
  tags: [String]
  _id: ID!
}

type AuthResponse {
  email: String
  token: String
  userId: String
}

type CreateExamResponse {
  examId: String
  nextQuestion: ClientQuestionResponse
}

type AnswerQuizResponse {
  message: String
  success: Boolean
  nextQuestion: ClientQuestionResponse
  completed: Boolean
}

type Mutation {
  signup(email: String!,password: String!): AuthResponse
  signin(email: String!,password: String!): AuthResponse
  newQuiz: CreateExamResponse
  answerQuizQuestion(examId: String!, questionId: String!, selectedIndex: Int!): AnswerQuizResponse
}

type Query {
  hello: String
  getAllUsers: [User]
}
`;

export { typeDefs };
