const express = require('express');
const router = express.Router();
const connection = require('../database');

// Endpoint untuk menghitung stress level mingguan
router.get('/weekly/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const avg = 'SELECT AVG(stress_value) AS average_value FROM stress_level WHERE employee_id=$1';
    const resultAvg = await connection.query(avg, [id]);
    const stressPrecentage = resultAvg.rows[0].average_value/40*100;
    const response = {
      total_avg: stressPrecentage
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Endpoint untuk menyimpan stress level mingguan

router.post('/add/:id', async (req, res) => {
  const { stressLevel } = req.body;
  var stressValue = 0;
  for (let i = 0; i < stressLevel.length; i++) {
    var currentValue = stressLevel[i];
    if  (i===3 || i===4 || i===6 ||i===7){
      currentValue = (4-stressLevel[i]);
    }
    stressValue = stressValue + currentValue;
  }
  const id = req.params.id;
  try {
    const sql = `INSERT INTO stress_level (employee_id, date, stress_value) VALUES ($1, current_date, $2)`;
    await connection.query(sql, [id, stressValue], (error)=> {
      if (error){
          console.error(error);
          res.status(500).json({message: 'Internal Server Error'})
      }
      const response = {message: 'Stress Level Added',
                        stress_value: stressValue}
      res.status(200).json(response);
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;