const express = require("express");
const Analysis = require("../models/Analysis");

const router = express.Router();

/* =========================
   SAVE ANALYSIS RESULT
========================= */

router.post("/save", async (req, res) => {
  try {
    const {
      userId,
      career,
      selectedSkills,
      missingSkills,
      skillScore,
      assessmentScore,
      assessmentCorrect,
      assessmentTotal,
      finalScore,
      readinessLevel,
    } = req.body;

    if (!userId || !career) {
      return res.status(400).json({
        message: "User and career are required",
      });
    }

    const newAnalysis = new Analysis({
      userId,
      career,
      selectedSkills: selectedSkills || [],
      missingSkills: missingSkills || [],
      skillScore,
      assessmentScore,
      assessmentCorrect,
      assessmentTotal,
      finalScore,
      readinessLevel,
    });

    await newAnalysis.save();

    res.status(201).json({
      message: "Analysis saved successfully",
      analysis: newAnalysis,
    });
  } catch (error) {
    console.log("Analysis Save Error:", error);

    res.status(500).json({
      message: "Server error while saving analysis",
    });
  }
});

/* =========================
   GET USER ANALYSIS HISTORY
========================= */

router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const analyses = await Analysis.find({
      userId: userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Analysis history fetched successfully",
      analyses: analyses,
    });
  } catch (error) {
    console.log("History Error:", error);

    res.status(500).json({
      message: "Server error while fetching history",
    });
  }
});

module.exports = router;