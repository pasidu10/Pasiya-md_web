const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());

// Sample in-memory data (replace with real DB)
let stats = {
  deployed: 75000,
  active: 35000,
  newDeploy: 15000,
  dailyDeployments: [10000, 12000, 14000, 13000, 16000, 14000, 15000]
};

// GET stats API
app.get("/api/stats", (req, res) => {
  res.json(stats);
});

// POST update stats (secure this!)
app.post("/api/stats", (req, res) => {
  const { deployed, active, newDeploy, dailyDeployments } = req.body;
  // Ideally verify token here for security
  stats = { deployed, active, newDeploy, dailyDeployments };
  res.json({ success: true, stats });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
