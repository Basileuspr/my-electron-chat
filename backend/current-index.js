const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// GET route for initial test
app.get('/api/message', (req, res) => {
  res.json({ message: "Backend is online." });
});

// POST route for chat input
app.post('/api/message', (req, res) => {
  const userMessage = req.body.message;
  const reply = `You said: "${userMessage}"`;
  res.json({ message: reply });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend server is running at http://localhost:${PORT}`);
});
