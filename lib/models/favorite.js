var DarkSkyService = require('../services/dark_sky_service');

var Currently = require('./currently');

class Favorite {

  constructor(location, currentWeather) {
    this.location  = location;
    this.current_weather = new Currently(currentWeather)
  }
}

module.exports = Favorite;