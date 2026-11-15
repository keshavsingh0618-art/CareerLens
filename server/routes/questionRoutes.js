const express = require("express");
const Question = require("../models/Question");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   GET QUESTIONS BY CAREER
   LOGGED-IN USERS
========================= */

router.get(
  "/career/:career",
  protect,
  async (req, res) => {
    try {
      const career = req.params.career;

      const questions = await Question.find({
        career: career,
        isActive: true,
      }).sort({
        createdAt: 1,
      });

      res.status(200).json({
        message:
          "Career questions fetched successfully",
        totalQuestions: questions.length,
        questions,
      });
    } catch (error) {
      console.log(
        "Career Questions Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching career questions",
      });
    }
  }
);

/* =========================
   GET ALL QUESTIONS
   ADMIN ONLY
========================= */

router.get(
  "/",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const questions = await Question.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        message: "Questions fetched successfully",
        totalQuestions: questions.length,
        questions,
      });
    } catch (error) {
      console.log(
        "Questions Fetch Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while fetching questions",
      });
    }
  }
);

/* =========================
   ADD QUESTION
   ADMIN ONLY
========================= */

router.post(
  "/",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const {
        career,
        question,
        options,
        correctAnswer,
        difficulty,
      } = req.body;

      if (
        !career ||
        !question ||
        !options ||
        correctAnswer === undefined
      ) {
        return res.status(400).json({
          message:
            "Career, question, options and correct answer are required",
        });
      }

      if (
        !Array.isArray(options) ||
        options.length < 2
      ) {
        return res.status(400).json({
          message:
            "At least two answer options are required",
        });
      }

      if (
        correctAnswer < 0 ||
        correctAnswer >= options.length
      ) {
        return res.status(400).json({
          message:
            "Correct answer index is invalid",
        });
      }

      const newQuestion = new Question({
        career,
        question,
        options,
        correctAnswer,
        difficulty: difficulty || "Medium",
      });

      await newQuestion.save();

      res.status(201).json({
        message:
          "Question added successfully",
        question: newQuestion,
      });
    } catch (error) {
      console.log(
        "Question Add Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while adding question",
      });
    }
  }
);

/* =========================
   UPDATE QUESTION
   ADMIN ONLY
========================= */

router.put(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const {
        career,
        question,
        options,
        correctAnswer,
        difficulty,
        isActive,
      } = req.body;

      if (
        options &&
        (!Array.isArray(options) ||
          options.length < 2)
      ) {
        return res.status(400).json({
          message:
            "At least two answer options are required",
        });
      }

      if (
        options &&
        correctAnswer !== undefined &&
        (correctAnswer < 0 ||
          correctAnswer >= options.length)
      ) {
        return res.status(400).json({
          message:
            "Correct answer index is invalid",
        });
      }

      const updatedQuestion =
        await Question.findByIdAndUpdate(
          req.params.id,
          {
            career,
            question,
            options,
            correctAnswer,
            difficulty,
            isActive,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedQuestion) {
        return res.status(404).json({
          message: "Question not found",
        });
      }

      res.status(200).json({
        message:
          "Question updated successfully",
        question: updatedQuestion,
      });
    } catch (error) {
      console.log(
        "Question Update Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while updating question",
      });
    }
  }
);

/* =========================
   DELETE QUESTION
   ADMIN ONLY
========================= */

router.delete(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const deletedQuestion =
        await Question.findByIdAndDelete(
          req.params.id
        );

      if (!deletedQuestion) {
        return res.status(404).json({
          message: "Question not found",
        });
      }

      res.status(200).json({
        message:
          "Question deleted successfully",
      });
    } catch (error) {
      console.log(
        "Question Delete Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error while deleting question",
      });
    }
  }
);

module.exports = router;