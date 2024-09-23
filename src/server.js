import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/execute', async (req, res) => {
  const { script, language, versionIndex } = req.body;
  const clientId = process.env.VITE_YOUR_CLIENT_ID;
  const clientSecret = process.env.VITE_YOUR_CLIENT_SECRET;

  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      script,
      language,
      versionIndex,
      clientId,
      clientSecret,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error compiling code:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error compiling code' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
