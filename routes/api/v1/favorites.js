var googleService  = require('../../../lib/services/google_service')
var darkSkyService  = require('../../../lib/services/dark_sky_service')
var Favorite = require('../../../lib/models/favorite')

var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


router.post('/', (request, response) => {
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

router.get('/', (request, response) => {
  database('users').where({ apiKey: request.body.api_key }).select().first()
    .then((user) => {
      if (user) {
        validFavoriteResponse(request, response, user.id)
      }
      else {
        invalidUserResponse(response);
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
  });

router.delete('/', (request, response) => {
  database('users').where({ apiKey: request.body.api_key }).select().first()
    .then((user) => {
      if (user) {
        database('favorites').where({ user_id: user.id, location: request.body.location }).del()
          .then(() => {
            response.status(204).send()
          });
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

async function validFavoriteResponse(requestm, response, user_id) {
  let favorites = await database('favorites').where({ user_id: user_id }).select()
  // get the current weather for every favorite
  let favoriteWeathers = await createFavorites(favorites)
  // return array of these objects
  response.status(200).json(favoriteWeathers)
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

async function createFavorites(favorites) {
  let favoriteObjects = []
  for (favorite of favorites) { 
    location = favorite.location
    currentWeather = await darkSkyService.getWeather({ lat: favorite.lat, lng: favorite.lng})
    // console.log(currentWeather)
    favoriteObjects.push(new Favorite(location, currentWeather.currently))
  }
  // favorites.forEach(favorite => {
  //   location = favorite.location
  //   currentWeather = await darkSkyService.getWeather({ lat: favorite.lat, lng: favorite.lng})
  //   favoriteObjects.push(new Favorite(location, currentWeather))
  // })
  // console.log(favoriteObjects)
  return favoriteObjects;
}

module.exports = router;
