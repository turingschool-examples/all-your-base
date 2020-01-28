const express = require('express');
const router  = express.Router();
const request = require('request')
require('dotenv').config('/.env')

router.get('/', (req, res) => {
  const location = req.query.location



  .then((forecast) => {
    res.status(200).json(forecast);
  })
  .catch(error => {
    res.status(500).json({error_message: error})
  })
});


module.exports = router
