// External Dependencies
import { getUsers } from "./users";
import { register, login } from "./auth";
import { createExam, answerExam, examResult } from "./exams";

const resolvers = {
  Query: {
    hello: () => `Hello from graphql resolver`,
    getAllUsers: (_: any) => getUsers(),
    getExamResults: (_: any, { examId }: any, context: any) =>
      examResult(examId, context),
  },

  Mutation: {
    signup: (_: any, { email, password }: any) => register(email, password),
    signin: (_: any, { email, password }: any) => login(email, password),
    newQuiz: (_: any, __: any, context: any) => createExam(context),
    answerQuizQuestion: (
      _: any,
      { examId, questionId, selectedIndex }: any,
      context: any
    ) => answerExam({ examId, questionId, selectedIndex, context }),
  },
};

export { resolvers };
