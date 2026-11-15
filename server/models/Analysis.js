const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    career: {
      type: String,
      required: true,
    },

    selectedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    skillScore: {
      type: Number,
      required: true,
    },

    assessmentScore: {
      type: Number,
      required: true,
    },

    assessmentCorrect: {
      type: Number,
      default: 0,
    },

    assessmentTotal: {
      type: Number,
      default: 0,
    },

    finalScore: {
      type: Number,
      required: true,
    },

    readinessLevel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Analysis",
  analysisSchema
);