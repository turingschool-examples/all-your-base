var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


router.get('/', (request, response) => {
  const apiKey = request.body

  for (let requiredParameter of ['api_key']) {
    if (!apiKey[requiredParameter]) {
      return response
      .status(422)
      .send({ error: `Expected format: { apiKey: <String>}. You're missing a "${requiredParameter}" property.` })
    }
  }

  database('users')
    .where('api_key', apiKey['api_key'])
    .select()
    .then(user => {
      if (user.length) {
        response.send(user)
      } else {
        response.status(404).json({
          error: `Could not find user with api_key ${request.body.api_key}`
        })
      }
  })

  const location = request.query.location

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}&address=${location}`)
    .then(response => response.json())
    .then(result => {
      let coords = result.results[0].geometry.location
      fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${coords.lat},${coords.lng}`)
        .then(response => response.json())
        .then(result => {
          let current = result.currently
        })
    })
    .catch((error) => console.error({ error }))
});

module.exports = router;
