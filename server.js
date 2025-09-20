
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let botCount = 75000;

function increaseCount() {
  // Every 7.5 seconds increase count by 8 (or random 6-8)
  const increaseBy = Math.floor(Math.random() * 3) + 6; // 6,7,8
  botCount += increaseBy;
}

setInterval(increaseCount, 7500);

app.get('/api/botcount', (req, res) => {
  res.json({ count: botCount });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
