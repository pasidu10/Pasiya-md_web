// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// --- Simple JWT Login Route ---
app.post("/api/login", (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ message: "Login Successful", token });
});

// --- Verify Token Middleware ---
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// --- Protected Route Example ---
app.get("/api/subjects", verifyToken, (req, res) => {
  res.json([
    { id: 1, name: "Mathematics", grade: "O/L" },
    { id: 2, name: "Science", grade: "O/L" },
  ]);
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
