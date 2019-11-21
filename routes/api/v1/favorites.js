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
      if (user.length){
        // retrieve an array of all user's favorite cities
        favoriteCities(user)
          .then(cities => {
            console.log(cities)
          })
      }
    })
});

async function findUser(apiKey) {
  try {
    return await database('users').where({apiKey: apiKey});
  } catch(e){
      return e;
  }
}

async function favoriteCities(user) {
  let userId = user[0].id
  try{
    return await database('favorites').where({user_id: userId})
  }catch(e){
    return e;
  }
}

module.exports = router;
