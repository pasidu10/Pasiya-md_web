import express from "express";
import multer from "multer";
import fs from "fs";
import OpenAI from "openai";
import axios from "axios";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/chat", async (req, res) => {
  const { message, provider } = req.body;
  try {
    if (provider === "gemini") {
      const geminiRes = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: message }] }] }
      );
      return res.json({ reply: geminiRes.data.candidates[0].content.parts[0].text });
    } else {
      const chat = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      });
      return res.json({ reply: chat.choices[0].message.content });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
