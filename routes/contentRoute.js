// routes/contentRoute.js
import express from "express";
import Content from "../models/ContentModel.js";

const router = express.Router();

// GET all content (list)
router.get("/", async (req, res) => {
  try {
    const items = await Content.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET subjects summary (lightweight)
router.get("/subjects", async (req, res) => {
  try {
    const items = await Content.find({}, "subject lessonTitle gradeLevel").sort({ subject: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by id
router.get("/:id", async (req, res) => {
  try {
    const item = await Content.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE content (admin)
router.post("/", async (req, res) => {
  try {
    const adminHeader = req.headers["x-admin-key"];
    if (adminHeader !== "PASIYA-MD-TEAM") return res.status(403).json({ error: "Admin only" });

    const { subject, gradeLevel, lessonTitle, notesPDFUrl, pastPaperPDFUrl } = req.body;
    const newContent = new Content({ subject, gradeLevel, lessonTitle, notesPDFUrl, pastPaperPDFUrl });
    await newContent.save();
    res.json(newContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
