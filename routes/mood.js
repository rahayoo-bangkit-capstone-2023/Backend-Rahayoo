const express = require('express');
const router = express.Router();
const connection = require('../database');

router.get('/weekly-calendar/:id', async (req, res) => {
    const id = req.params.id;
    const sqlCalendar = `SELECT mood_value, date, employee_id FROM mood WHERE employee_id=$1 AND date BETWEEN current_date - interval '7' day AND current_date ORDER BY date ASC`;
    const sqlStressWeek = `SELECT AVG(stress_value) AS stress_value FROM stress_level WHERE employee_id=$1 AND date BETWEEN current_date - interval '7' day AND current_date`;
    const sqlMoodWeek = `SELECT mood_value FROM mood WHERE employee_id = $1 AND date BETWEEN current_date - interval '7' day AND current_date GROUP BY mood_value ORDER BY COUNT(*) DESC LIMIT 1`;
  
    try {
      const resultCalendar = await connection.query(sqlCalendar, [id]);
      const resultStressWeek = await connection.query(sqlStressWeek, [id]);
      const resultMoodWeek = await connection.query(sqlMoodWeek, [id]);
  
      const counts = resultCalendar.rows.reduce((acc, obj) => {
        const key = obj.date.toISOString().split('T')[0];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
  
      const uniqueArray = Object.values(resultCalendar.rows.reduce((acc, obj) => {
        const key = obj.date.toISOString().split('T')[0];
        if (!acc[key] || acc[key].count < counts[key]) {
          acc[key] = obj;
          acc[key].count = counts[key];
        }
        return acc;
      }, {}));
  
      const response = {
        weekly_stress_avg: resultStressWeek.rows.length > 0 ? resultStressWeek.rows[0].stress_value : null,
        weekly_mood: resultMoodWeek.rows.length > 0 ? resultMoodWeek.rows[0].mood_value : null,
        weekly_calendar: uniqueArray,
      };
  
      res.status(200).json(response);
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