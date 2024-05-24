const mediumQuestions = [
  {
    question: "Solve for x: 3x - 7 = 2x + 5",
    options: ["x = -12", "x = 12", "x = -2", "x = 2"],
    correctOptionIndex: 1,
    difficulty: 2,
  },
  {
    question:
      "What is the area of a circle with a diameter of 14 cm? (Use π = 3.14)",
    options: ["154 cm²", "49 cm²", "196 cm²", "78.5 cm²"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question: "Simplify: 4x² - 2x + 5x - 3",
    options: ["4x² + 3x - 3", "4x² - 7x + 3", "4x² + 7x - 3", "4x² + 3x + 3"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question:
      "What is the length of the hypotenuse in a right triangle with legs of 6 cm and 8 cm?",
    options: ["10 cm", "14 cm", "12 cm", "11 cm"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question: "Factorize: x² - 9",
    options: ["(x + 3)(x - 3)", "(x + 9)(x - 1)", "(x - 3)²", "(x + 1)(x - 9)"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question: "Solve for y: 2y/3 - 1 = 5",
    options: ["y = 9", "y = 6", "y = 12", "y = 18"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question:
      "What is the volume of a rectangular prism with length 5 cm, width 3 cm, and height 4 cm?",
    options: ["60 cm³", "20 cm³", "30 cm³", "12 cm³"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question:
      "What is the median of the following set of numbers: 3, 8, 1, 4, 6?",
    options: ["4", "6", "5", "3"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question: "If a = 5 and b = 12, what is the value of a² - b²?",
    options: ["-119", "7", "0", "-79"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question: "What is the next number in the sequence: 5, 11, 17, 23, ...?",
    options: ["29", "30", "31", "35"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question: "What is the surface area of a cube with a side length of 4 cm?",
    options: ["64 cm²", "48 cm²", "96 cm²", "32 cm²"],
    correctOptionIndex: 2,
    difficulty: 2,
  },
  {
    question: "What is the value of 2⁵?",
    options: ["10", "25", "32", "64"],
    correctOptionIndex: 2,
    difficulty: 2,
  },
  {
    question: "Simplify: 5(x - 2) + 3",
    options: ["5x - 7", "5x - 10 + 3", "5x - 13", "5x - 7 + 3"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question: "In the equation y = 2x + 5, what is the y-intercept?",
    options: ["2", "5", "x", "y"],
    correctOptionIndex: 1,
    difficulty: 2,
  },
  {
    question: "What is the value of x if 4x - 8 = 3x + 2?",
    options: ["x = 10", "x = -10", "x = 8", "x = 2"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question:
      "How many degrees are in the sum of the interior angles of a quadrilateral?",
    options: ["90°", "180°", "270°", "360°"],
    correctOptionIndex: 3,
    difficulty: 2,
  },
  {
    question: "What is the value of √81?",
    options: ["7", "8", "9", "10"],
    correctOptionIndex: 2,
    difficulty: 2,
  },
  {
    question: "What is 25% of 240?",
    options: ["60", "40", "50", "30"],
    correctOptionIndex: 0,
    difficulty: 2,
  },
  {
    question:
      "If the radius of a circle is tripled, by what factor does the area increase?",
    options: ["3", "6", "9", "12"],
    correctOptionIndex: 2,
    difficulty: 2,
  },
  {
    question:
      "What is the probability of drawing a red card from a standard deck of 52 cards?",
    options: ["1/4", "1/3", "1/2", "1/6"],
    correctOptionIndex: 2,
    difficulty: 2,
  },
];

const hardQuestions = [
  {
    question: "Solve for x: 5x/2 - 3 = 7",
    options: ["x = 4", "x = 2", "x = 5", "x = 8"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question:
      "What is the area of a circle with a radius of 10 cm? (Use π = 3.14)",
    options: ["314 cm²", "157 cm²", "31.4 cm²", "100 cm²"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question: "Simplify: 3x² - 2x + 4 - (x² - 2x + 5)",
    options: ["2x² - 1", "4x² + 1", "2x² + 9", "4x² - 1"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question:
      "What is the length of the diagonal of a rectangle with length 6 cm and width 8 cm?",
    options: ["10 cm", "14 cm", "12 cm", "11 cm"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question: "Factorize: 4x² - 25",
    options: [
      "(2x + 5)(2x - 5)",
      "(4x + 5)(x - 5)",
      "(2x - 5)²",
      "(2x + 5)(4x - 5)",
    ],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question: "Solve for y: 4y/5 + 2 = 6",
    options: ["y = 5", "y = 6", "y = 12", "y = 18"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question:
      "What is the volume of a cylinder with a radius of 3 cm and a height of 5 cm? (Use π = 3.14)",
    options: ["45 cm³", "141.3 cm³", "282.6 cm³", "226.2 cm³"],
    correctOptionIndex: 1,
    difficulty: 3,
  },
  {
    question:
      "What is the median of the following set of numbers: 3, 8, 1, 4, 6, 9, 10?",
    options: ["6", "4", "5", "8"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question: "If a = 7 and b = 24, what is the value of √(a² + b²)?",
    options: ["25", "31", "17", "23"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question: "What is the next number in the sequence: 7, 14, 28, 56, ...?",
    options: ["70", "112", "84", "128"],
    correctOptionIndex: 1,
    difficulty: 3,
  },
  {
    question:
      "What is the surface area of a sphere with a radius of 5 cm? (Use π = 3.14)",
    options: ["314 cm²", "157 cm²", "3140 cm²", "785 cm²"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question: "What is the value of 2⁷?",
    options: ["49", "128", "64", "256"],
    correctOptionIndex: 1,
    difficulty: 3,
  },
  {
    question: "Simplify: 7(x - 2) - 3(2x + 1)",
    options: ["x - 17", "x - 13", "x + 17", "x + 13"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question:
      "In the equation y = 3x² - 4x + 7, what type of function is this?",
    options: ["Linear", "Quadratic", "Cubic", "Exponential"],
    correctOptionIndex: 1,
    difficulty: 3,
  },
  {
    question: "What is the value of x if 2x² - 8x + 6 = 0?",
    options: ["x = 2 ± √2", "x = 3 ± √1", "x = 1 ± √3", "x = 4 ± √2"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question:
      "How many degrees are in the sum of the interior angles of a pentagon?",
    options: ["360°", "540°", "720°", "900°"],
    correctOptionIndex: 1,
    difficulty: 3,
  },
  {
    question: "What is the value of √225?",
    options: ["15", "25", "12", "18"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question: "What is 20% of 360?",
    options: ["72", "60", "80", "90"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
  {
    question:
      "If the side length of a cube is doubled, by what factor does the volume increase?",
    options: ["2", "4", "8", "16"],
    correctOptionIndex: 2,
    difficulty: 3,
  },
  {
    question:
      "What is the probability of drawing an ace from a standard deck of 52 cards?",
    options: ["1/13", "1/26", "1/52", "1/4"],
    correctOptionIndex: 0,
    difficulty: 3,
  },
];
