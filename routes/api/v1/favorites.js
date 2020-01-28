const express = require('express');
const router  = express.Router();
const favoritesController = require('../../../controllers/favorites_controller')

router.get('/favorites', favoritesController.index);

module.exports = router
