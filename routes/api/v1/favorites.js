const express = require('express');
const router  = express.Router();
const favoritesController = require('../../../controllers/favorites_controller')

router.get('/favorites', favoritesController.index);

router.post('/favorites', favoritesController.create)

router.delete('/favorites', favoritesController.destroy)

module.exports = router
