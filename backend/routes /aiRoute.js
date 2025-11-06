import express from "express";
import OpenAI from "openai";
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/ai-answer", async (req, res) => {
  const { question, gradeLevel } = req.body;

  try {
    const systemPrompt = `
      You are a helpful Sri Lankan education assistant.
      Only answer according to the ${gradeLevel} syllabus.
      Question: ${question}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }],
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ message: "AI request failed." });
  }
});

export default router;
