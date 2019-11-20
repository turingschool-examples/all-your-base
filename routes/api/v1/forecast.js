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
                    var o = {} // empty Object
                    var key = "location";
                    o[key] = request.query.location; // empty Array, which you can push() values into
                    var second_key = "currently"
                    o[second_key] = body2.currently
                    var third_key = "hourly"
                    o[third_key] = body2.hourly

                    var third_key = "daily"
                    o[third_key] = body2.daily
                    // console.log(body2)

                    // var data = {
                    //     sampleTime: '1450632410296',
                    //     data: '76.36731:3.4651554:0.5665419'
                    // };
                    // var data2 = {
                    //     sampleTime: '1450632410296',
                    //     data: '78.15431:0.5247617:-0.20050584'
                    // };
                    // o[key].push(data);
                    // o[key].push(data2);
                    // console.log(o)
        response.status(200).json(o)
    }).catch(err => {
        console.log(err);
    });
}).catch(err => {
    console.log(err);
});

// var options2 = {
//     uri: `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}`,
//     json: true // Automatically parses the JSON string in the response
// };
//
// rp(options2).then(body => {
//     console.log(body.results);
// }).catch(err => {
//     console.log(err);
// });
  // database('users').select()
  //   .then((users) => {
  //     response.status(200).json(users);
  //   })
  //   .catch((error) => {
  //     response.status(500).json({ error });
  //   });
});

module.exports = router;
