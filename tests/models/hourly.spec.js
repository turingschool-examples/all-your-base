var shell = require('shelljs');
var request = require("supertest");

var Hourly = require('../../lib/models/hourly');

describe('Hourly', function() {

  it('should have attributes', function() {
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

    hourly = new Hourly(hourlyParams)

    expect(hourly.summary).toBe("Partly cloudy throughout the day and breezy this evening.")
    expect(hourly.icon).toBe("wind")
    expect(hourly.data[0].time).toBe(1555016400)
    expect(hourly.data[0].summary).toBe("Overcast")
    expect(hourly.data[0].icon).toBe("cloudy")
    expect(hourly.data[0].precipIntensity).toBe(0)
    expect(hourly.data[0].precipProbability).toBe(0)
    expect(hourly.data[0].temperature).toBe(54.9)
    expect(hourly.data[0].humidity).toBe(0.65)
    expect(hourly.data[0].pressure).toBe(1020.8)
    expect(hourly.data[0].windSpeed).toBe(11.3)
    expect(hourly.data[0].windGust).toBe(22.64)
    expect(hourly.data[0].windBearing).toBe(293)
    expect(hourly.data[0].cloudCover).toBe(1)
    expect(hourly.data[0].visibility).toBe(9.02)
  });
});
