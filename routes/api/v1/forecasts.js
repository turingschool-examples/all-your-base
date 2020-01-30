var ForecastFacade = require('../../../lib/facades/forecast_facade')

var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


router.get('/', (request, response) => {
  // request.query.location
  database('users').where({ apiKey: request.body.apiKey }).select().first()
    .then((user) => {
      if (user) {
        response.status(200).json(new ForecastFacade(request.query.location));
      }
      else {
        response.status(401).json({ message: 'unauthorized'}); 
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

module.exports = router;
