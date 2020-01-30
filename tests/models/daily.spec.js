var shell = require('shelljs');
var request = require("supertest");

var Daily = require('../../lib/models/daily');

describe('Daily', function() {

  it('should have attributes', function() {
    dailyParams = {
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
    }

    daily = new Daily(dailyParams)
    
    expect(daily.time).toBe(1554966000)
    expect(daily.summary).toBe("Partly cloudy throughout the day and breezy in the evening.")
    expect(daily.icon).toBe("wind")
    expect(daily.sunriseTime).toBe(1554990063)
    expect(daily.sunsetTime).toBe(1555036947)
    expect(daily.precipIntensity).toBe(0.0001)
    expect(daily.precipIntensityMax).toBe(0.0011)
    expect(daily.precipIntensityMaxTime).toBe(1555045200)
    expect(daily.precipProbability).toBe(0.11)
    expect(daily.precipType).toBe("rain")
    expect(daily.temperatureHigh).toBe(57.07)
    expect(daily.temperatureLow).toBe(51.47)
    expect(daily.humidity).toBe(0.66)
    expect(daily.pressure).toBe(1020.5)
    expect(daily.windSpeed).toBe(10.94)
    expect(daily.windGust).toBe(33.93)
    expect(daily.cloudCover).toBe(0.38)
    expect(daily.visibility).toBe(9.51)
    expect(daily.temperatureMin).toBe(53.49)
    expect(daily.temperatureMax).toBe(58.44)
  });
});