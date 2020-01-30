var shell = require('shelljs');
var request = require("supertest");

var Hourly = require('../../lib/models/hourly');

describe('Hourly', function() {

  it('should have attributes', function() {
    hourlyParams = {
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
      "visibility": 9.02
    }

    hourly = new Hourly(hourlyParams)
    
    expect(hourly.time).toBe(1555016400)
    expect(hourly.summary).toBe("Overcast")
    expect(hourly.icon).toBe("cloudy")
    expect(hourly.precipIntensity).toBe(0)
    expect(hourly.precipProbability).toBe(0)
    expect(hourly.temperature).toBe(54.9)
    expect(hourly.humidity).toBe(0.65)
    expect(hourly.pressure).toBe(1020.8)
    expect(hourly.windSpeed).toBe(11.3)
    expect(hourly.windGust).toBe(22.64)
    expect(hourly.windBearing).toBe(293)
    expect(hourly.cloudCover).toBe(1)
    expect(hourly.visibility).toBe(9.02)
  });
});
