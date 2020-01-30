var Currently = require('../models/currently')
var Hourly = require('../models/hourly')
var Daily = require('../models/daily')

class ForecastFacade {

  constructor(location) {
    let currentlyParams = {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12
    }

    let hourlyParams = {
      "summary": "Partly cloudy throughout the day and breezy this evening.",
      "icon": "wind",
      "data": [{
        "time": 1555016400,
        "summary": "Overcast",
        "icon": "cloudy",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 54.9,
        "humidity": 0.65,
        "pressure": 1020.8,
        "windSpeed": 11.3,
        "windGust": 22.64,
        "windBearing": 293,
        "cloudCover": 1,
        "visibility": 9.02,
      }]
    }

    let dailyParams = {
      "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
      "icon": "clear-day",
      "data": [{
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44
      }]
    }
    this.location = location
    this.currently = new Currently(currentlyParams)
    this.hourly = {
      summary: hourlyParams.summary,
      icon: hourlyParams.icon,
      data: [new Hourly(hourlyParams.data[0])]
    }
    this.daily = {
      summary: dailyParams.summary,
      icon: dailyParams.icon,
      data: [new Daily(dailyParams.data[0])]
    }
  }
}

module.exports = ForecastFacade;