import express from 'express'
import axios from 'axios'; 
import cors from 'cors';
import { config } from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

config(); 
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const apiKey = process.env.REACT_APP_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const { prompt } = req.body;

    const response = model.generateContent(prompt); 
    console.log(result.response.text());

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error generating response' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
