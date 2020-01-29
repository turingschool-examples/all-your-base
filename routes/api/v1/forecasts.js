const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router  = express.Router();
require('dotenv').config('/.env')

app.use(bodyParser.json());      // extended: utf8 and emojis etc
app.use(bodyParser.urlencoded({ extended: true}));
app.set('port', process.env.PORT || 3000);


const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const fetch = require('node-fetch')

router.get('/', (req, res) => {
  let url =  new URL("https://maps.googleapis.com/maps/api/geocode/json")
  let location = req.query.location
  let params = {address:location, key:process.env.GOOGLE_GEOCODE_API_KEY}
  url.search = new URLSearchParams(params).toString();
  const getLocation = async url => {
    try {
      const response = await fetch(url, { headers: {"Content-Type": "application/json"} })
      const json = await response.json();
      response.status(200).json(response);
    } catch (error) {
      response.status(500).json({error_message: error});
    }
    };
  }
});


module.exports = router;
