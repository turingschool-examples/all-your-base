var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");
var Forecast = require('../../../pojos/forecast')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.get('/', (request, response) => {
  const apiKey = request.body

  for (let requiredParameter of ['api_key']) {
    if (!apiKey[requiredParameter]) {
      return response.status(401).json({ error: `Unauthorized access` })
    }
  }

  database('users')
    .where('api_key', apiKey['api_key']).select()
    .then(user => {
      if (user.length === 0) {
        response.status(401).json({ error: `Unauthorized access`})
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
          response.json(new Forecast(location, result))
        })
    })
    .catch((error) => response.status(500).send({ error }))
});

module.exports = router;
