const express = require('express');
const router  = express.Router();
require('dotenv').config('/.env')


const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);




router.get('/', (req, res) => {
  async function getUser() {
    let user = await database('users').where({api_key: req.body.api_key}).first()
    return user
  }
  getUser()
    .then((user) => {
      database('favorites').where({user_id: user.id}).select()
        .then((favorites) => {
          res.status(200).json(favorites);
        })
        .catch((error) => {
          res.status(500).json({error_message: error});
        });
    })
    .catch((error) => {
      res.status(500).json({error_message: error});
    })
});


router.post('/', (req, res) => {
  async function getUser() {
    let user = await database('users').where({api_key: req.body.api_key}).first()
    return user
  }
  location = req.body.location
  getUser()
    .then((user) => {
      database('favorites').insert({ location: location, user_id: user.id }, 'location')
      .then((location) => {
        res.status(200).json({ message: `${location} has been added to your favorites`})
      })
      .catch((error) => {
        res.status(500).json({message: error})
      })
    })
    .catch((error) => {
      res.status(500).json({ message: error })
    })
});


router.delete('/', (req, res) => {
  async function getUser() {
    let user = await database('users').where({api_key: req.body.api_key}).first()
    return user
  }
  location = req.body.location
  getUser()
    .then((user) => {
      database('favorites').where({ location: location, user_id: user.id }).del()
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        res.status(500).json({message: error})
      })
    })
    .catch((error) => {
      res.status(500).json({ message: error })
    })
});


module.exports = router;
