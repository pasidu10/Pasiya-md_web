const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(express.static('public')); // serve frontend files

app.post('/chat', async (req, res) => {
  const userMsg = req.body.message;
  try {
    // Replace with your API call to bk9.fun
    const apiRes = await fetch('https://api.bk9.fun/ai/gemini', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt: userMsg }) // check API docs for exact format
    });
    const apiData = await apiRes.json();
    res.json({ reply: apiData.response || "Sorry, no reply." });
  } catch(err) {
    res.json({ reply: "Error contacting AI service." });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
