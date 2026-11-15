
const mongoose = require("mongoose");
require("dotenv").config();

const Question = require("./models/Question");

const questions = [
  // =================================
  // FRONTEND DEVELOPER (3 Easy, 1 Medium, 1 Hard)
  // =================================

  {
    career: "Frontend Developer",
    question: "Which React hook is used to manage state in a functional component?",
    options: ["useState", "useEffect", "useNavigate", "useRoute"],
    correctAnswer: 0,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Frontend Developer",
    question: "Which HTML element is used to create a navigation section?",
    options: ["<section>", "<nav>", "<header>", "<aside>"],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Frontend Developer",
    question: "Which of the following is part of the CSS box model?",
    options: ["Padding", "Database", "Routing", "Middleware"],
    correctAnswer: 0,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Frontend Developer",
    question: "Which React hook is commonly used to perform side effects such as fetching data?",
    options: ["useState", "useEffect", "useMemo", "useRef"],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Frontend Developer",
    question: "Why should unique keys be provided when rendering lists in React?",
    options: [
      "To improve CSS styling",
      "To help React identify which list items have changed",
      "To create database records",
      "To prevent API requests",
    ],
    correctAnswer: 1,
    difficulty: "Hard",
    isActive: true,
  },

  // =================================
  // BACKEND DEVELOPER (2 Easy, 2 Medium, 1 Hard)
  // =================================

  {
    career: "Backend Developer",
    question: "Which HTTP method is generally used to retrieve data from a server?",
    options: ["POST", "GET", "DELETE", "PATCH"],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Backend Developer",
    question: "Which database is used in the CareerLens backend?",
    options: ["MongoDB", "Redis", "Oracle", "SQLite"],
    correctAnswer: 0,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Backend Developer",
    question: "What is middleware commonly used for in Express.js?",
    options: [
      "Styling web pages",
      "Processing requests before they reach route handlers",
      "Creating HTML elements",
      "Managing CSS animations",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Backend Developer",
    question: "What does the async keyword indicate in JavaScript?",
    options: [
      "The function always returns a Promise",
      "The function cannot return a value",
      "The function runs only in the browser",
      "The function automatically connects to MongoDB",
    ],
    correctAnswer: 0,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Backend Developer",
    question: "Why should a backend verify a JWT rather than simply decode its payload?",
    options: [
      "To make the token shorter",
      "To verify the token's signature and authenticity",
      "To convert it into JSON",
      "To remove the user password from MongoDB",
    ],
    correctAnswer: 1,
    difficulty: "Hard",
    isActive: true,
  },

  // =================================
  // DATA ANALYST (2 Easy, 2 Medium, 1 Hard)
  // =================================

  {
    career: "Data Analyst",
    question: "Which measure represents the arithmetic average of a set of values?",
    options: ["Median", "Mode", "Mean", "Range"],
    correctAnswer: 2,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Data Analyst",
    question: "Which SQL clause is used to filter rows based on a condition?",
    options: ["ORDER BY", "WHERE", "GROUP BY", "SELECT"],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Data Analyst",
    question: "Which SQL clause is used to group rows with matching values?",
    options: ["GROUP BY", "ORDER BY", "INSERT INTO", "UPDATE"],
    correctAnswer: 0,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Data Analyst",
    question: "What is a common approach for handling missing values in a numerical dataset?",
    options: [
      "Always delete the entire dataset",
      "Replace them with an appropriate statistic such as the median",
      "Convert every value to text",
      "Ignore the dataset structure",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Data Analyst",
    question: "What is the main purpose of a SQL window function?",
    options: [
      "To delete duplicate databases",
      "To perform calculations across related rows without collapsing them into one row per group",
      "To create a website layout",
      "To encrypt database passwords",
    ],
    correctAnswer: 1,
    difficulty: "Hard",
    isActive: true,
  },

  // =================================
  // FULL STACK DEVELOPER (2 Easy, 2 Medium, 1 Hard)
  // =================================

  {
    career: "Full Stack Developer",
    question: "Which HTTP status code generally indicates a successful request?",
    options: ["404", "500", "200", "301"],
    correctAnswer: 2,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Full Stack Developer",
    question: "Which JavaScript function can be used in the browser to make an HTTP request?",
    options: ["fetch()", "console.log()", "parseInt()", "alert()"],
    correctAnswer: 0,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Full Stack Developer",
    question: "What is the purpose of CORS in web applications?",
    options: [
      "To define whether a browser may access resources from another origin",
      "To store passwords in a database",
      "To compile JavaScript into HTML",
      "To create database collections",
    ],
    correctAnswer: 0,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Full Stack Developer",
    question: "What does REST generally mean when designing web APIs?",
    options: [
      "A database backup method",
      "An architectural style for networked applications",
      "A CSS framework",
      "A JavaScript testing library",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Full Stack Developer",
    question: "Why are database transactions useful when multiple related updates must succeed together?",
    options: [
      "They guarantee all related operations succeed or are rolled back together",
      "They automatically create frontend components",
      "They remove the need for authentication",
      "They convert SQL queries into CSS",
    ],
    correctAnswer: 0,
    difficulty: "Hard",
    isActive: true,
  },
];

async function seedQuestions() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from your .env file.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const existingCount = await Question.countDocuments();

    if (existingCount > 0) {
      console.log(
        `Stopped safely: ${existingCount} questions already exist.`
      );
      return;
    }

    await Question.insertMany(questions);

    console.log(`Successfully inserted ${questions.length} questions!`);

    const summary = await Question.aggregate([
      {
        $group: {
          _id: {
            career: "$career",
            difficulty: "$difficulty",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.career": 1, "_id.difficulty": 1 } },
    ]);

    console.log("Question distribution:");
    console.table(
      summary.map((item) => ({
        Career: item._id.career,
        Difficulty: item._id.difficulty,
        Questions: item.count,
      }))
    );
  } catch (error) {
    console.error("Question seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
}

seedQuestions();
