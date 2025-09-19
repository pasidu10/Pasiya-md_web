import express from "express";
import bodyParser from "body-parser";
import { loadPlugins, handleInput } from "./pluginManager.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Load plugins before starting server
await loadPlugins();

// API Route – user sends message
app.post("/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Handle user input with plugins
  const reply = handleInput(message);

  res.json({
    user: message,
    bot: reply,
    powered_by: "PASIYA-MD PRIME BOT",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PASIYA-MD PRIME BOT running on http://localhost:${PORT}`);
});
