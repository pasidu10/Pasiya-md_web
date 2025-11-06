import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import aiRoute from "./routes/aiRoute.js";
import uploadRoute from "./routes/uploadRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/pasiya-md")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Routes
app.use("/api", aiRoute);
app.use("/api", uploadRoute);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 PASIYA-MD AI SCHOOL BACKEND RUNNING SUCCESSFULLY!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
