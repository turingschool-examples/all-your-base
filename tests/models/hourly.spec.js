var shell = require('shelljs');
var request = require("supertest");

var Hourly = require('../../lib/models/hourly');

describe('Hourly', function() {

  it('should have attributes', function() {
    hourlyParams = {
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

    hourly = new Hourly(hourlyParams)
    
    expect(hourly.summary).toBe("Overcast")
    expect(hourly.icon).toBe("cloudy")
    expect(hourly.precipIntensity).toBe(0)
    expect(hourly.precipProbability).toBe(0)
    expect(hourly.temperature).toBe(54.91)
    expect(hourly.humidity).toBe(0.65)
    expect(hourly.pressure).toBe(1020.51)
    expect(hourly.windSpeed).toBe(11.91)
    expect(hourly.windGust).toBe(23.39)
    expect(hourly.windBearing).toBe(294)
    expect(hourly.cloudCover).toBe(1)
    expect(hourly.visibility).toBe(9.12)
  });
});
