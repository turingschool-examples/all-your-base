var shell = require('shelljs');
var request = require("supertest");

var Currently = require('../../lib/models/currently');

describe('Currently', function() {

  it('should have attributes', function() {
    currentlyParams = {
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

    currently = new Currently(currentlyParams)

    expect(currently.summary).toBe("Overcast")
    expect(currently.icon).toBe("cloudy")
    expect(currently.precipIntensity).toBe(0)
    expect(currently.precipProbability).toBe(0)
    expect(currently.temperature).toBe(54.91)
    expect(currently.humidity).toBe(0.65)
    expect(currently.pressure).toBe(1020.51)
    expect(currently.windSpeed).toBe(11.91)
    expect(currently.windGust).toBe(23.39)
    expect(currently.windBearing).toBe(294)
    expect(currently.cloudCover).toBe(1)
    expect(currently.visibility).toBe(9.12)
  });
});
