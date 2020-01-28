const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/api/v1/users');
const forecastRouter = require('./routes/api/v1/forecast');
const favoritesRouter = require('./routes/api/v1/favorites');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Express Sweater Weather';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/forecast', forecastRouter);

app.use('/api/v1/favorites', favoritesRouter);


module.exports = app;
