const express = require('express');
const router = express.Router();
const connection = require('../database');


router.get('/calendar/:id', async (req, res) => {
    const id = req.params.id;
    try {
      res.status(200).json({ message: '3' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/add/:id', async (req, res) => {
    const randomArray = ["joy", "sadness", "anger", "fear", "love"];
    const moodLevel = Math.random() * 4;
    const mood = randomArray[Math.floor(moodLevel)];
    const id = req.params.id;
    try {
        const sqlInput = "INSERT INTO mood (employee_id, date, mood_value) VALUES ($1, current_date, $2)";
    await connection.query(sqlInput, [id, mood], (error)=> {
        if (error){
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'})
        }
        const response = {message: 'Mood Added'}
        res.status(200).json(response);
    })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;