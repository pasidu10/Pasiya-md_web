// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import aiRouter from "./routes/aiRoute.js";
import uploadRouter from "./routes/uploadRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/passify", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// 🔹 Routes
app.use("/api/ai-answer", aiRouter);
app.use("/api/upload-paper", uploadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
