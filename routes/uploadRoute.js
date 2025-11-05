// routes/uploadRoute.js
import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// 🔹 Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/past-papers");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 🔹 Basic Admin Middleware
const isAdmin = (req, res, next) => {
  const adminHeader = req.headers["x-admin-key"];
  if (adminHeader === "PASIYA-MD-TEAM") next();
  else return res.status(403).json({ error: "Access denied. Admin only." });
};

// 🔹 POST /api/upload-paper
router.post("/", isAdmin, upload.single("paper"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "No PDF file uploaded." });

  res.json({
    message: "✅ PDF uploaded successfully!",
    filePath: `/uploads/past-papers/${req.file.filename}`,
  });
});

export default router;
