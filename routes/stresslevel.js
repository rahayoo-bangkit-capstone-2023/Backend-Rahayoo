const express = require('express');
const router = express.Router();
const connection = require('../database');

// Endpoint untuk menghitung stress level mingguan
router.get('/weekly/:id', async (req, res) => {
 
  const id = req.params.id;

  try {
    const weekly = `SElECT AVG(stress_value) from stress_level WHERE employee_id = $1 GROUP BY date`;
    const avg = `SElECT AVG(stress_value) from stress_level WHERE employee_id = $1 GROUP BY employee_id`;
    await connection.query(weekly, [id], (error, resultWeekly)=> {
      if (error){
          console.error(error);
          res.status(500).json({message: 'Internal Server Error'})
      }
      connection.query(avg, [id], (error, resultAvg)=> {
        if (error){
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'})
        }
      const response = {
          weekly_avg: resultWeekly.rows,
          total_avg: resultAvg.rows
      }
        res.status(200).json(response);
    })
  })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Endpoint untuk menyimpan stress level mingguan
router.post('/add/:id', async (req, res) => {
  const { stressLevel } = req.body;
  const id = req.params.id;

  try {
    const sql = `INSERT INTO stress_level (employee_id, date, stress_value) VALUES ('${id}', current_date, $1),('${id}', current_date, $2),('${id}', current_date, $3),('${id}', current_date, $4),('${id}', current_date, $5),('${id}', current_date, $6),('${id}', current_date, $7),('${id}', current_date, $8),('${id}', current_date, $9),('${id}', current_date, $10)`;
    await connection.query(sql, stressLevel);

    res.status(201).json({ message: 'Daily stress level saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;