// routes/aiRecommendRoute.js
import express from "express";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/ai-recommend
router.post("/", async (req, res) => {
  try {
    const { gradeLevel, subject, prompt } = req.body;
    const safeGrade = gradeLevel === "A/L" ? "A/L" : "O/L";

    const systemPrompt = `
You are "Passify AI Tutor". Give concise study help tailored to Sri Lankan ${safeGrade} syllabus.
When asked for lesson suggestions or paper tips, provide bullet points (max 8). Keep responses suitable for students, in simple English or Sinhala if requested.
Do NOT give exam answers for copyrighted recent papers; provide study guidance only.
    `;

    const userPrompt = prompt || `Provide 6 key lesson topics and 3 past-paper practice tips for ${subject || "general"} ${safeGrade}.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 600,
    });

    const answer = completion.choices?.[0]?.message?.content ?? "No response";
    res.json({ recommendation: answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
