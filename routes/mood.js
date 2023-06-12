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


module.exports = router;