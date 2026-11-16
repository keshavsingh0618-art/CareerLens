
const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getErrorStatus = (error) =>
  Number(error.status || error.code || error.error?.code);

async function generateResponse(ai, model, message, systemInstruction) {
  const response = await ai.models.generateContent({
    model,
    contents: message,
    config: {
      systemInstruction,
    },
  });

  const reply = response.text?.trim();

  if (!reply) {
    throw new Error("AI returned an empty response.");
  }

  return reply;
}

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
      httpOptions: {
        timeout: 45000,
        retryOptions: {
          attempts: 1,
        },
      },
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

    let reply;

    try {
      console.log("Trying primary Gemini model...");

      reply = await generateResponse(
        ai,
        "gemini-3.5-flash-lite",
        message.trim(),
        systemInstruction
      );

      console.log("Primary Gemini model responded successfully.");
    } catch (primaryError) {
      const status = getErrorStatus(primaryError);

      console.log("Primary Gemini Error:", primaryError);

      if (![429, 500, 502, 503, 504].includes(status)) {
        throw primaryError;
      }

      console.log("Switching to backup Gemini model...");

      // Short pause before backup request
      await sleep(500);

      try {
        reply = await generateResponse(
          ai,
          "gemini-3.8-flash",
          message.trim(),
          systemInstruction
        );

        console.log("Backup Gemini model responded successfully.");
      } catch (backupError) {
        console.log("Backup Gemini Error:", backupError);
        throw backupError;
      }
    }

    return res.status(200).json({
      message: "AI response generated successfully",
      reply,
    });

  } catch (error) {
    console.log("CareerLens Gemini Error:", error);

    const status = getErrorStatus(error);

    if (status === 429) {
      return res.status(429).json({
        message: "Gemini usage limit reached. Please try again later.",
      });
    }

    if (status === 400) {
      return res.status(400).json({
        message: "Gemini could not process this request. Please try again.",
      });
    }

    if (status === 401 || status === 403) {
      return res.status(500).json({
        message: "Gemini API key is invalid or does not have permission.",
      });
    }

    if ([500, 502, 503, 504].includes(status)) {
      return res.status(503).json({
        message: "AI is temporarily busy. Please try again in a moment.",
      });
    }

    return res.status(500).json({
      message: "Unable to generate AI career guidance right now.",
    });
  }
});

module.exports = router;
