require('dotenv').config()
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch')

router.get('/', (req, res) => {
  // get a user by api key
  findUser(req.body.api_key)
    .then(user => {
      // console.log(user[0].id)
      return(user[0].id)
    })
  // retrieve all user's favorites
});

async function findUser(apiKey) {
  try {
    return await database('users').where({apiKey: apiKey});
  } catch (error){
    return error;
  }
}

module.exports = router;
