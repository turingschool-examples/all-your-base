const express = require('express');
const router = express.Router();
const users = require('./routes/api/v1/users')
const app = express();
const forecast = require('./routes/api/v1/forecasts')
const favorites = require('./routes/api/v1/favorites')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.use('/api/v1/users', users)

app.use('/api/v1/forecast', forecast)

app.use('/api/v1/favorites', favorites)


module.exports = router;
