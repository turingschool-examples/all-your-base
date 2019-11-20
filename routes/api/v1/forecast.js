require('dotenv').config();
var express = require('express');
var router = express.Router();
// var request = require('request');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const rp = require('request-promise');



 // rp('http://www.google.com').then(body => {
 //     console.log(body);
 // }).catch(err => {
 //     console.log(err);
 // });

router.get('/', (request, response) => {
  var options = {
      uri: 'https://maps.googleapis.com/maps/api/geocode/json',
      qs: {
          key: process.env.GOOGLE_API_KEY, // -> uri + '?access_token=xxxxx%20xxxxx'
          address: request.query.location
      },
      json: true // Automatically parses the JSON string in the response
  };

  // console.log(process.env.GOOGLE_API_KEY)
    // console.log(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}&address=${request.query.location}`)
  // request(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}&address=${request.query.location}`, function (error, response, body) {
  // if (!error && response.statusCode == 200) {
  //   console.log(body) // Show the HTML for the Google homepage.
  // }
// }); [1].geometry.location.lat
rp(options).then(body => {
    var latitude = body.results[0].geometry.location.lat;
    var longitude = body.results[0].geometry.location.lng;

    var options2 = {
        uri: `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}?exclude=minutely`,
        json: true // Automatically parses the JSON string in the response
    };

    rp(options2).then(body2 => {
      var json_response = {} // empty Object
      json_response["location"] = request.query.location; // empty Array, which you can push() values into
      json_response["currently"] = body2.currently
      json_response["hourly"] = body2.hourly
      json_response["daily"] = body2.daily

      delete json_response.currently.time
      delete json_response.currently.nearestStormDistance
      delete json_response.currently.nearestStormBearing
      delete json_response.currently.apparentTemperature
      delete json_response.currently.dewPoint
      delete json_response.currently.uvIndex
      delete json_response.currently.ozone

      json_response.hourly.data.forEach((hash) => {
        delete hash.precipType;
        delete hash.apparentTemperature;
        delete hash.dewPoint;
        delete hash.uvIndex;
        delete hash.ozone;
      });

      json_response.daily.data.forEach((hash) => {
        delete hash.moonPhase;
        delete hash.temperatureHighTime;
        delete hash.temperatureLowTime;
        delete hash.apparentTemperatureHigh;
        delete hash.apparentTemperatureHighTime;
        delete hash.apparentTemperatureLow;
        delete hash.apparentTemperatureLowTime;
        delete hash.dewPoint;
        delete hash.windGustTime;
        delete hash.windBearing;
        delete hash.uvIndex;
        delete hash.uvIndexTime;
        delete hash.ozone;
        delete hash.temperatureMinTime;
        delete hash.temperatureMaxTime;
        delete hash.apparentTemperatureMax;
        delete hash.apparentTemperatureMaxTime;
        delete hash.apparentTemperatureMin;
        delete hash.apparentTemperatureMinTime;
        delete hash.precipAccumulation;
      });
        response.status(200).json(json_response)
    }).catch(err => {
        console.log(err);
    });
}).catch(err => {
    console.log(err);
});
});

module.exports = router;
