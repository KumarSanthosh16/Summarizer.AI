const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/summarize', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Summarize this like im a very beginner in this topic:\n${text}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'X-goog-api-key': `${process.env.GEMINI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ summary: response.data.candidates[0].content.parts[0].text });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to summarize' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
