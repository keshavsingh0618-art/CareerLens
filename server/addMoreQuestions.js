
console.log("AddMoreQuestions script started!");

const mongoose = require("mongoose");
require("dotenv").config();

const Question = require("./models/Question");

const newQuestions = [
  // FRONTEND DEVELOPER - 5 additional questions
  {
    career: "Frontend Developer",
    question: "Which CSS property is used to create space outside an element's border?",
    options: ["padding", "margin", "border-spacing", "outline"],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Frontend Developer",
    question: "What is the purpose of the alt attribute in an HTML image tag?",
    options: [
      "To change image size",
      "To provide alternative text",
      "To add a border",
      "To create an image link",
    ],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Frontend Developer",
    question: "Which JavaScript method creates a new array by transforming each element?",
    options: ["filter()", "reduce()", "map()", "find()"],
    correctAnswer: 2,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Frontend Developer",
    question: "What is the main purpose of useMemo in React?",
    options: [
      "To handle routing",
      "To memoize expensive calculations",
      "To create components",
      "To manage API requests",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Frontend Developer",
    question: "What is reconciliation in React?",
    options: [
      "A process of comparing virtual DOM changes",
      "A method of styling components",
      "A database operation",
      "A routing technique",
    ],
    correctAnswer: 0,
    difficulty: "Hard",
    isActive: true,
  },

  // BACKEND DEVELOPER - 5 additional questions
  {
    career: "Backend Developer",
    question: "Which Node.js module is used to work with file paths?",
    options: ["http", "path", "events", "crypto"],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Backend Developer",
    question: "What does JSON stand for?",
    options: [
      "Java Standard Object Network",
      "JavaScript Object Notation",
      "Java Source Open Network",
      "Joined System Object Notation",
    ],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Backend Developer",
    question: "Which HTTP status code indicates that a resource has been created successfully?",
    options: ["200", "201", "400", "500"],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Backend Developer",
    question: "Why is bcrypt commonly used in authentication systems?",
    options: [
      "To store passwords as plain text",
      "To hash passwords securely",
      "To manage database connections",
      "To create API routes",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Backend Developer",
    question: "What is the main benefit of database indexing?",
    options: [
      "It reduces query search time",
      "It deletes duplicate records automatically",
      "It encrypts database records",
      "It removes the need for queries",
    ],
    correctAnswer: 0,
    difficulty: "Hard",
    isActive: true,
  },

  // DATA ANALYST - 5 additional questions
  {
    career: "Data Analyst",
    question: "Which Python library is widely used for data manipulation?",
    options: ["Pandas", "Django", "Flask", "TensorFlow"],
    correctAnswer: 0,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Data Analyst",
    question: "Which chart is most suitable for showing proportions of a whole?",
    options: ["Line chart", "Pie chart", "Scatter plot", "Histogram"],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Data Analyst",
    question: "What does correlation measure?",
    options: [
      "The relationship between two variables",
      "The total number of records",
      "The maximum value in a dataset",
      "The number of missing values",
    ],
    correctAnswer: 0,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Data Analyst",
    question: "Which Excel function counts cells that meet a specified condition?",
    options: ["SUM", "AVERAGE", "COUNTIF", "MAX"],
    correctAnswer: 2,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Data Analyst",
    question: "What does a p-value help determine in hypothesis testing?",
    options: [
      "The size of a dataset",
      "Evidence against the null hypothesis",
      "The average of all observations",
      "The number of variables",
    ],
    correctAnswer: 1,
    difficulty: "Hard",
    isActive: true,
  },

  // FULL STACK DEVELOPER - 5 additional questions
  {
    career: "Full Stack Developer",
    question: "Which Git command copies a remote repository to your local machine?",
    options: ["git push", "git commit", "git clone", "git merge"],
    correctAnswer: 2,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Full Stack Developer",
    question: "Which CSS layout system is designed for arranging items in one dimension?",
    options: ["Grid", "Flexbox", "Float", "Position"],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Full Stack Developer",
    question: "Why are environment variables used in web applications?",
    options: [
      "To store configuration separately from source code",
      "To style HTML elements",
      "To replace database queries",
      "To create frontend components",
    ],
    correctAnswer: 0,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Full Stack Developer",
    question: "What does a JavaScript Promise represent?",
    options: [
      "A CSS animation",
      "The eventual completion or failure of an asynchronous operation",
      "A database table",
      "A synchronous loop",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Full Stack Developer",
    question: "Why should backend validation be performed even when frontend validation exists?",
    options: [
      "Frontend validation is always secure",
      "Users can bypass frontend validation",
      "It makes CSS faster",
      "It removes the need for authentication",
    ],
    correctAnswer: 1,
    difficulty: "Hard",
    isActive: true,
  },
];

async function addMoreQuestions() {
  try {
    console.log("Checking environment variables...");

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from your .env file.");
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected!");

    const existingCount = await Question.countDocuments();

    console.log("Existing questions:", existingCount);

    if (existingCount !== 20) {
      throw new Error(
        `Expected exactly 20 existing questions, but found ${existingCount}. No questions were added.`
      );
    }

    const expectedCareers = [
      "Frontend Developer",
      "Backend Developer",
      "Data Analyst",
      "Full Stack Developer",
    ];

    for (const career of expectedCareers) {
      const count = await Question.countDocuments({ career });

      console.log(`${career}: ${count} existing questions`);

      if (count !== 5) {
        throw new Error(
          `Expected 5 existing questions for ${career}, but found ${count}. No questions were added.`
        );
      }
    }

    console.log("Adding 20 new questions...");

    const result = await Question.insertMany(newQuestions);

    console.log(`Successfully added ${result.length} new questions!`);

    console.log("\nUpdated question counts:");

    for (const career of expectedCareers) {
      const count = await Question.countDocuments({ career });
      console.log(`${career}: ${count} questions`);
    }

    console.log(
      `\nTotal questions: ${await Question.countDocuments()}`
    );

  } catch (error) {
    console.error("\nError:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    console.log("MongoDB connection closed.");
  }
}

addMoreQuestions();
