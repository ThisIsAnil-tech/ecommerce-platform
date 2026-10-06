const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const response = await axios.post('http://user-service:3001/users/login', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

module.exports = router;