const express = require('express');
const router  = express.Router();
require('dotenv').config('/.env')


const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);



//
// router.get('/', (req, res) => {
//   database('users').where('api_key', req.body.api_key).first()
//     .then((user) => {
//       if (user) {
//   res.send('respond with resource')
// });


router.post('/', (req, res) => {
  res.send('respond with resource')
});


router.delete('/', (req, res) => {
  res.send('respond with resource')
});


module.exports = router;
