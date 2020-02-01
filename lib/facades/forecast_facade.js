var DarkSkyService = require('../services/dark_sky_service');

var Currently = require('../models/currently');
var Hourly    = require('../models/hourly');
var Daily     = require('../models/daily');

class ForecastFacade {

  constructor(location, forecast) {
    this.location  = location;
    this.currently = new Currently(forecast.currently)
    this.hourly    = new Hourly(forecast.hourly)
    this.daily     = new Daily(forecast.daily)
  }
}

module.exports = ForecastFacade;