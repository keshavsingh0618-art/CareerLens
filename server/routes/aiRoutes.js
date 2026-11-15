const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/chat", protect, async (req, res) => {
  try {
    const { message, context = {} } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        message: "Please enter a question.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        message: "Gemini API key is not configured.",
      });
    }

    const {
      career = "Not Selected",
      skillScore = 0,
      assessmentScore = 0,
      finalScore = 0,
      readinessLevel = "Not Available",
      selectedSkills = [],
      missingSkills = [],
    } = context;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const systemInstruction = `
You are CareerLens AI Career Assistant.

Your role is to give personalized, practical, beginner-friendly career
guidance to students based on their CareerLens assessment.

Student Profile:
Name: ${req.user?.name || "Student"}
Target Career: ${career}
Skill Readiness Score: ${skillScore}%
Technical Assessment Score: ${assessmentScore}%
Final Career Readiness Score: ${finalScore}%
Readiness Level: ${readinessLevel}

Known Skills:
${
  selectedSkills.length > 0
    ? selectedSkills.join(", ")
    : "No skills recorded"
}

Missing Skills:
${
  missingSkills.length > 0
    ? missingSkills.join(", ")
    : "No major skill gaps recorded"
}

Rules:
- Personalize advice using the student's CareerLens data.
- Focus on the selected target career.
- Prioritize missing skills.
- Recommend practical learning steps.
- Recommend suitable projects when useful.
- Keep answers structured and easy for a college student to understand.
- Do not claim the student knows skills that are not listed.
- If the student asks for a learning plan, give a realistic step-by-step plan.
- If the student asks how to improve their readiness score, explain what
  technical skills or gaps they should work on.
- Avoid generic motivational answers.
- Keep responses useful and reasonably concise.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message.trim(),
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const reply = response.text?.trim();

    if (!reply) {
      return res.status(500).json({
        message: "AI did not return a response.",
      });
    }

    return res.status(200).json({
      message: "AI response generated successfully",
      reply: reply,
    });
  } catch (error) {
    console.log("CareerLens Gemini Error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        message:
          "Gemini free-tier usage limit reached. Please try again later.",
      });
    }

    if (error.status === 400) {
      return res.status(400).json({
        message:
          "Gemini could not process this request. Please try again.",
      });
    }

    if (error.status === 401 || error.status === 403) {
      return res.status(500).json({
        message:
          "Gemini API key is invalid or does not have permission.",
      });
    }

    return res.status(500).json({
      message:
        "Unable to generate AI career guidance right now.",
    });
  }
});

module.exports = router;