const express = require('express');
const router  = express.Router();
require('dotenv').config('/.env')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const Coordinate = require('../../../app/pojos/coordinate')
const Forecast = require('../../../app/pojos/forecast')
const fetch = require('node-fetch')


router.get('/', (req, res) => {
  // let users = database('users').select().then((users) => { console.log(users)})
  async function getUser() {
    let user = await database('users').where({api_key: req.body.api_key}).first()
    return user
  }
  getUser()
    .then((user) => {
      if (user.api_key == req.body.api_key) {
        let location = req.query.location
        let key = process.env.GOOGLE_GEOCODE_API_KEY
        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`
        fetch(url)
        .then(response => response.json())
        .then(result => new Coordinate(result))
        .then(coordinate => {
          let coord = coordinate
          let key = process.env.DARKSKY_API_KEY
          let url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${coord.lat},${coord.lng}`
          fetch(url)
          .then(response => response.json())
          .then(result => new Forecast(result, location))
          .then((forecast) => {
            res.send(forecast)
          })
        })
      } else {
        res.status(401).json({error: 'Unauthorized request'})
      }
    })
    .catch((error) => {
      res.status(401).json({error_message: error});
    })
});


module.exports = router;
