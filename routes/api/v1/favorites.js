var googleService  = require('../../../lib/services/google_service')

var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


router.post('/', (request, response) => {
  // request.query.location
  database('users').where({ apiKey: request.body.api_key }).select().first()
    .then((user) => {
      if (user) {
        validUserResponse(request, response, user.id)
      }
      else {
        invalidUserResponse(response);
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

async function validUserResponse(request, response, user_id) {
  let googleResponse = await getGeocode(request.query.location);
  if (googleResponse.results) {
    let geoCoordinate = googleResponse.results[0].geometry.location;
    let location = request.body.location;
    database('favorites').insert({
      user_id: user_id,
      location: location,
      lat: geoCoordinate.lat,
      lng: geoCoordinate.lng
    }).then(() => {
      response.status(200).json({ message: `${location} has been added to your favorites`})
    }).catch((error) => {
      response.status(500).json({ error })
    })
  } 
  else {
    response.status(422).json({ message: 'invalid or missing parameter' });
  }
  return response;
}

function invalidUserResponse(response) {
  return response.status(401).json({ message: 'unauthorized'}); 
}

async function getGeocode(location) {
  let googleResponse = new Promise((res, rej) => {
    setTimeout(() => { 
      res(googleService.getGeocode(location), 100000)
    });
  });

  return (await googleResponse);
}

module.exports = router;
