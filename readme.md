# Quizzzy Backend

Quizzzy as the name suggests is a quiz app that is based on Computerized Adaptive Testing (CAT) to adapt the difficulty of the quiz based
on the user's performance.

# Idea

For authentication jwt is used with email and google oauth option with the usual jwt auth flow

The backend consist on 3 mongodb models

- Exam
- Question
- User

When a user tries to give a quiz an Exam is created in the database along with user id whose created the quiz and the question with difficulty 1 is sent to the frontend , on response of the question, the question id is stored in the exam, score is updated based on respose and a different question is sent to the frontend until 20 questions have been answered

# Technology Stack

MongoDB, Express, React, Node.js, TypeScript.

# Features Available

- JWT and google OAuth Authentication
- Taking quizes by submiting to MCQ Questions
- Analysis of all the quiz the user has taken
- Performance evaluation
- Question tags

# Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- MongoDB or MongoDB Atlas

# Installation

```bash
git clone https://github.com/hritickjaiswal22/quizzzy-backend.git
npm install
npm run dev
```

# Building for Production

```bash
npm run build
npm start
```

# Directory Structure

## Backend Directory Structure

```plaintext
backend/
├── src/
|   ├── configs/           # Config files
|   |
│   ├── controllers/       # Controllers
│   |
│   ├── middlewares/       # Middleware functions
│   │
│   ├── models/            # Mongodb models
│   │
│   ├── routes/            # Express routes
│   │
│   ├── services/          # Services
│   |
│   ├── utils/             # Util functions
│   └── index.ts           # Entry point
|
├── package.json
├── tsconfig.json
└── .env                   # Environment variables
```
