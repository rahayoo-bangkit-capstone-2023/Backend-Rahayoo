const express = require('express');
const router = express.Router();
const client = require('../database');
const axios = require('axios');

router.post('/chatbot/:id', async (req, res) => {
    const { chat } = req.body;
    const employee_id = req.params.id;
    const chatbotUrl = 'https://chatbot.rahayoo.com/get';
    const moodUrl = 'https://ml-service-mxmq3zqv4a-as.a.run.app/api/deteksi';
    const formData = new FormData();
    const formDataMood = new FormData();
    let botAnswer;
    formDataMood.append('data', chat);
    formData.append('msg', chat);
  
    try {
      // Make the chatbot API request using Axios
      const chatbotResponse = await axios.post(chatbotUrl, formData);
      botAnswer = chatbotResponse.data;

      // Make the mood API request using Axios
      const moodResponse = await axios.post(moodUrl, formDataMood);
      const mood = moodResponse.data;
      // Perform the database insertion
      const sql = 'INSERT INTO mood (employee_id, date, mood_value) VALUES ($1, current_date, $2)';

      await client.query(sql, [employee_id, mood.data]);
        
      // Send the response with the bot answer
      const answer = {
        message: 'Mood Added',
        answer: botAnswer,
      };
      res.status(200).json(answer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;