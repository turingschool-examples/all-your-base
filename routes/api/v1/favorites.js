const express = require('express');
const router  = express.Router();


router.get('/', (req, res) => {
  res.send('respond with resource')
});


router.post('/', (req, res) => {
  res.send('respond with resource')
});


router.delete('/', (req, res) => {
  res.send('respond with resource')
});


module.exports = router;
