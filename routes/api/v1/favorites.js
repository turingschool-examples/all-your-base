var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


router.get('/', (request, response) => {
  // if there's a valid api key
  database('favorites').select()
    .then(res => response.status(200).json(res));
});

// router.post('/', (request, response) => {
//   (async() => {
//     const favorite = request.body
//     const userId =
//   })
// });
// .insert is how you create favorites

module.exports = router;

// create setup folder for file setup stuff; import file
// if you're setting up services etc that get things called on it, leave those in your file
