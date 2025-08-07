const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;
const logPath = path.join(__dirname, 'server.log');

function log(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`);
}

app.use(cors());
app.use(express.json());

app.get('/api/message', (req, res) => {
  log('GET /api/message');
  res.json({ message: "Backend is online." });
});

app.post('/api/message', (req, res) => {
  const userMessage = req.body.message;
  const reply = `You said: "${userMessage}"`;
  log(`POST /api/message - User said: "${userMessage}"`);
  res.json({ message: reply });
});

app.listen(PORT, () => {
  const msg = `🚀 Backend started at http://localhost:${PORT}`;
  console.log(msg);
  log(msg);
});
