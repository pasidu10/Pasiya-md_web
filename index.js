const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Frontend files

// Initial stats
let deployed = 75000;
let active = 35000;
let newDeploy = 15000;

// Simulate live bot deployment increment every 7.5 seconds (~8 bots deployed)
setInterval(() => {
  deployed += 8;
  active += 5;     // example active increment
  newDeploy += 8;
}, 7500);

// API endpoint to get current stats
app.get("/api/stats", (req, res) => {
  res.json({ deployed, active, newDeploy });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
