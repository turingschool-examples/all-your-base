require('dotenv').config();
var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const rp = require('request-promise');

router.post('/', (request, response) => {
  database('users').where('api_key', request.body.api_key).then(user => {
    return database('favorites').insert({city: request.body.location, user_id: user[0].id})
  }).then(() => {
      response.status(200).json({'message': `${request.body.location} has been added to your favorites`});
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

module.exports = router;
