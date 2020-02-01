var shell = require('shelljs');
var request = require("supertest");

var Daily = require('../../lib/models/daily');

describe('Daily', function() {

  it('should have attributes', function() {
    dailyParams = {
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

    daily = new Daily(dailyParams)
    
    expect(daily.summary).toBe("No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.")
    expect(daily.icon).toBe("clear-day")
    expect(daily.data[0].time).toBe(1554966000)
    expect(daily.data[0].summary).toBe("Partly cloudy throughout the day and breezy in the evening.")
    expect(daily.data[0].sunriseTime).toBe(1554990063)
    expect(daily.data[0].icon).toBe("wind")
    expect(daily.data[0].sunsetTime).toBe(1555036947)
    expect(daily.data[0].precipIntensity).toBe(0.0001)
    expect(daily.data[0].precipIntensityMax).toBe(0.0011)
    expect(daily.data[0].precipIntensityMaxTime).toBe(1555045200)
    expect(daily.data[0].precipProbability).toBe(0.11)
    expect(daily.data[0].precipType).toBe("rain")
    expect(daily.data[0].temperatureHigh).toBe(57.07)
    expect(daily.data[0].temperatureLow).toBe(51.47)
    expect(daily.data[0].humidity).toBe(0.66)
    expect(daily.data[0].pressure).toBe(1020.5)
    expect(daily.data[0].windSpeed).toBe(10.94)
    expect(daily.data[0].windGust).toBe(33.93)
    expect(daily.data[0].cloudCover).toBe(0.38)
    expect(daily.data[0].visibility).toBe(9.51)
    expect(daily.data[0].temperatureMin).toBe(53.49)
    expect(daily.data[0].temperatureMax).toBe(58.44)
  });
});