// server/server.js (excerpt)
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
// ... other imports

dotenv.config();
const app = express();
app.use(express.json());
// ... mongodb connect

app.use("/api/auth", authRouter);
// ... other routes
