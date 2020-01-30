var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.post('/', (request, response) => {
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
  // database('users').where("api_key", apiKey).first
  //  .then(user =>  {
  //    // is user is null
  //         // return 403
  //
  //  })

   // location = request.query.location
   // validate location, else return

   // fetch ("google?=loc")
   // .then(loc.info  => {
        // if response.status return
        // else
        // fetch('darksky?=latlong')
        // .then(darksky.result =>{
        // response.send(darksky.results)
      // })

 // })




});

// steps
// 1. validate user
// 2. get location (lat, long from Geocode)
// 3.


module.exports = router;
