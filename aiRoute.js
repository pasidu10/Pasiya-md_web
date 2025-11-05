// routes/aiRoute.js
import express from "express";
import OpenAI from "openai";

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔹 POST /api/ai-answer
router.post("/", async (req, res) => {
  try {
    const { question, gradeLevel } = req.body;

    const systemPrompt = `
      You are "Passify AI Tutor", a Sri Lankan educational assistant.
      Answer only according to the Sri Lankan ${gradeLevel} syllabus (O/L or A/L).
      Respond clearly in Sinhala or English as suitable for students.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
