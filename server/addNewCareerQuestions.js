
const mongoose = require("mongoose");
require("dotenv").config();

const Question = require("./models/Question");

const questions = [
  // =================================
  // CYBERSECURITY ANALYST (3 Easy, 4 Medium, 3 Hard)
  // =================================

  {
    career: "Cybersecurity Analyst",
    question: "What does the CIA triad stand for in cybersecurity?",
    options: [
      "Confidentiality, Integrity, Availability",
      "Control, Internet, Access",
      "Cybersecurity, Information, Authentication",
      "Confidentiality, Internet, Authorization",
    ],
    correctAnswer: 0,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Cybersecurity Analyst",
    question: "Which of the following is an example of a strong password?",
    options: [
      "12345678",
      "password123",
      "Keshav2024",
      "T9#mQ2!vLp7@",
    ],
    correctAnswer: 3,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Cybersecurity Analyst",
    question: "What is phishing?",
    options: [
      "A method of encrypting files",
      "A fraudulent attempt to steal sensitive information",
      "A network monitoring technique",
      "A method of backing up data",
    ],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "Cybersecurity Analyst",
    question: "What is the primary purpose of a firewall?",
    options: [
      "To design websites",
      "To monitor and control network traffic based on security rules",
      "To increase screen resolution",
      "To store database records",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Cybersecurity Analyst",
    question: "Which Linux command is commonly used to view running processes?",
    options: ["mkdir", "ps", "touch", "pwd"],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Cybersecurity Analyst",
    question: "What is the main purpose of a SIEM tool?",
    options: [
      "To design network cables",
      "To collect and analyze security logs",
      "To develop mobile applications",
      "To manage website layouts",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Cybersecurity Analyst",
    question: "Which protocol is commonly used to securely access a remote Linux system?",
    options: ["HTTP", "FTP", "SSH", "SMTP"],
    correctAnswer: 2,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "Cybersecurity Analyst",
    question: "What is the main difference between hashing and encryption?",
    options: [
      "Hashing is generally one-way, while encryption is reversible using the appropriate key",
      "Both always require the same decryption key",
      "Encryption cannot protect data",
      "Hashing is used only for network routing",
    ],
    correctAnswer: 0,
    difficulty: "Hard",
    isActive: true,
  },
  {
    career: "Cybersecurity Analyst",
    question: "What should an incident response team generally do first after confirming a security incident?",
    options: [
      "Delete all system logs",
      "Follow the response plan and assess and contain the incident",
      "Immediately shut down every company device without assessment",
      "Publish all incident details publicly",
    ],
    correctAnswer: 1,
    difficulty: "Hard",
    isActive: true,
  },
  {
    career: "Cybersecurity Analyst",
    question: "What is the purpose of the principle of least privilege?",
    options: [
      "Give every user administrator access",
      "Allow users only the access needed for their responsibilities",
      "Disable all user accounts",
      "Share credentials among team members",
    ],
    correctAnswer: 1,
    difficulty: "Hard",
    isActive: true,
  },

  // =================================
  // UI/UX DESIGNER (3 Easy, 4 Medium, 3 Hard)
  // =================================

  {
    career: "UI/UX Designer",
    question: "What does UI stand for?",
    options: [
      "User Interface",
      "Universal Internet",
      "User Integration",
      "Unified Information",
    ],
    correctAnswer: 0,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "UI/UX Designer",
    question: "Which tool is widely used for UI/UX design and prototyping?",
    options: ["MongoDB", "Figma", "Node.js", "MySQL"],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "UI/UX Designer",
    question: "What is a wireframe?",
    options: [
      "A final coded website",
      "A basic visual layout showing the structure of a screen",
      "A database diagram",
      "A programming language",
    ],
    correctAnswer: 1,
    difficulty: "Easy",
    isActive: true,
  },
  {
    career: "UI/UX Designer",
    question: "What is the primary purpose of a prototype?",
    options: [
      "To test and demonstrate how a design may work",
      "To store user passwords",
      "To replace all user research",
      "To manage server requests",
    ],
    correctAnswer: 0,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "UI/UX Designer",
    question: "Which design principle helps users understand which elements are most important?",
    options: [
      "Random placement",
      "Visual hierarchy",
      "Code optimization",
      "Database normalization",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "UI/UX Designer",
    question: "What is the main purpose of user research?",
    options: [
      "To understand users' needs, behaviors and problems",
      "To select a programming language",
      "To increase the number of website pages",
      "To avoid testing a design",
    ],
    correctAnswer: 0,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "UI/UX Designer",
    question: "What is usability testing?",
    options: [
      "Checking database speed",
      "Observing users as they perform tasks to identify usability problems",
      "Testing internet connectivity only",
      "Checking source code formatting",
    ],
    correctAnswer: 1,
    difficulty: "Medium",
    isActive: true,
  },
  {
    career: "UI/UX Designer",
    question: "What is the purpose of accessibility in UI/UX design?",
    options: [
      "To make interfaces usable by people with different abilities",
      "To limit access to experienced users",
      "To use only bright colors",
      "To remove navigation from applications",
    ],
    correctAnswer: 0,
    difficulty: "Hard",
    isActive: true,
  },
  {
    career: "UI/UX Designer",
    question: "Why are personas created during the UX design process?",
    options: [
      "To represent key user types based on research",
      "To replace all usability testing",
      "To define the backend database schema",
      "To create random color combinations",
    ],
    correctAnswer: 0,
    difficulty: "Hard",
    isActive: true,
  },
  {
    career: "UI/UX Designer",
    question: "What is the best approach when usability testing reveals that users struggle to find an important feature?",
    options: [
      "Ignore the feedback",
      "Add more decorative elements",
      "Review the information architecture and improve navigation",
      "Remove the feature without further investigation",
    ],
    correctAnswer: 2,
    difficulty: "Hard",
    isActive: true,
  },
];

async function addNewCareerQuestions() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from your .env file.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected!");

    const careers = [
      "Cybersecurity Analyst",
      "UI/UX Designer",
    ];

    for (const career of careers) {
      const existingCount = await Question.countDocuments({
        career,
      });

      if (existingCount > 0) {
        throw new Error(
          `${career} already has ${existingCount} questions. Stopping to prevent duplicates.`
        );
      }
    }

    console.log("Adding 20 new MCQs...");

    await Question.insertMany(questions);

    console.log("Successfully inserted 20 new questions!");

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

    console.log("\nUpdated question distribution:");

    console.table(
      summary.map((item) => ({
        Career: item._id.career,
        Difficulty: item._id.difficulty,
        Questions: item.count,
      }))
    );

    const totalCount = await Question.countDocuments();

    console.log(`\nTotal questions in database: ${totalCount}`);
  } catch (error) {
    console.error("Question insertion failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
}

addNewCareerQuestions();
