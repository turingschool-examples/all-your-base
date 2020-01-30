const dotenv = require('dotenv').config();

var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');

router.get('/', (request, response) => {

  database('users').where('api_key', request.body.api_key).first()
    .then((user) => {
      if (user) {
      // UNCOMMENT THE BELOW LINE OF CODE WHEN THE HELPER METHOD IS WORKING AGAIN
        // let searchedLatAndLong = googleService(request.query.location);

        // REMOVE THIS CODE WHEN THE HELPER METHOD IS WORKING
        console.log(request.query.location);
        const location  = request.query.location;
        const googleApiKey = process.env.GOOGLE_API_KEY;

        const googleApiUrl =`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`;
        fetch(googleApiUrl, { method: 'GET'})
          .then((response) => {
             return response.json();
        })
        .then((json) => {
          const googleGeocodeResponse = json;
          const latAndLng = Object.values(googleGeocodeResponse.results[0].geometry.location);
          console.log(`the lat and long of the searched for location are ${latAndLng}`);
          // RETURN THE LAT AND LONG DATA

          // START OF DARKSKY API FETCHING
          const latAndLngFromGoogle = latAndLng;
          const darkSkyApiKey = process.env.DARKSKY_API_KEY;
          const darkSkyUrl = `https://api.darksky.net/forecast/${darkSkyApiKey}/${latAndLngFromGoogle}?exclude=minutely,flags&units=us`;
          fetch(darkSkyUrl, { method: 'GET'})
            .then((response) => {
               return response.json();
            })
            .then((json) => {

              // CURRENT WEATHER INFO
              let currentWeather = json.currently;
              // CLEAN UP THE CURRENT WEATHER INFO
              delete currentWeather.time;
              delete currentWeather.nearestStormDistance;
              delete currentWeather.nearestStormBearing;
              delete currentWeather.apparentTemperature;
              delete currentWeather.dewPoint;
              delete currentWeather.uvIndex;
              delete currentWeather.ozone;

              // HOURLY WEATHER INFO
              let hourlyWeather = json.hourly;
              let hourlyWeatherSumamry = json.hourly.summary;
              let hourlyWeatherIcon = json.hourly.icon;
              let eightHourForecast = hourlyWeather.data.slice(0, 8);
              eightHourForecast.forEach((day, index) => {
                delete day.precipType;
                delete day.precipAccumulation;
                delete day.apparentTemperature;
                delete day.dewPoint;
                delete day.uvIndex;
                delete day.ozone;
                return eightHourForecast;
              });

              // DAILY WEATHER INFO
              let dailyWeather = json.daily;
              let dailyWeatherSumamry = json.daily.summary;
              let dailyWeatherIcon = json.daily.icon;
              let sevenDayForecast = dailyWeather.data.slice(0, 7);

              sevenDayForecast.forEach((day, index) => {
                delete day.moonPhase;
                delete day.precipAccumulation;
                delete day.temperatureHighTime;
                delete day.temperatureLowTime;
                delete day.apparentTemperatureHigh;
                delete day.apparentTemperatureHighTime;
                delete day.apparentTemperatureLow;
                delete day.apparentTemperatureLowTime;
                delete day.dewPoint;
                delete day.windGustTime;
                delete day.windBearing;
                delete day.uvIndex;
                delete day.uvIndexTime;
                delete day.ozone;
                delete day.temperatureMinTime;
                delete day.temperatureMaxTime;
                delete day.apparentTemperatureMin;
                delete day.apparentTemperatureMinTime;
                delete day.apparentTemperatureMax;
                delete day.apparentTemperatureMaxTime;
                return sevenDayForecast;
              });
              response.status(200).json({currently: currentWeather, hourly: {summary: hourlyWeatherSumamry, icon: hourlyWeatherIcon, data: eightHourForecast}, daily: {summary: dailyWeatherSumamry, icon: dailyWeatherIcon, data: sevenDayForecast}});
            });
          // END OF DARSKY API FETCHING

        });
        // END OF getLatAndLng HELPER METHOD

      } else {
        response.status(401).json({error: 'Unauthorized!'});
      }


  }).catch(error => console.log(error));



});

// function getLatAndLng(request) {
//   console.log(request.query.location);
//   let location  = request.query.location;
//   let googleApiKey = process.env.GOOGLE_API_KEY;
//
//   let url =`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`;
//   fetch(url, { method: 'GET'})
//     .then((response) => {
//        return response.json();
//   })
//   .then((json) => {
//     let googleGeocodeResponse = json;
//     let latAndLng = Object.values(googleGeocodeResponse.results[0].geometry.location);
//     console.log(`the lat and long of the searched for location are ${latAndLng}`);
//     return latAndLng;
//   })
//   .catch((error) => {
//      response.status(500).json({ error });
//    });
// }


module.exports = router;
