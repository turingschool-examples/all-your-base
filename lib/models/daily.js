class Daily {

  constructor(args) {
    this.time    = args.time
    this.summary = args.summary
    this.icon    = args.icon
    this.data    = []
    this.formatDailyData(args.data)
  }

  formatDailyData(data) {
    data.forEach(day => {
      this.data.push({
        sunriseTime:            day.sunriseTime,
        time:                   day.time,
        icon:                   day.icon,
        summary:                day.summary,
        sunsetTime:             day.sunsetTime,
        precipIntensity:        day.precipIntensity,
        precipIntensityMax:     day.precipIntensityMax,
        precipIntensityMaxTime: day.precipIntensityMaxTime,
        precipProbability:      day.precipProbability,
        precipType:             day.precipType,
        temperatureHigh:        day.temperatureHigh,
        temperatureLow:         day.temperatureLow,
        humidity:               day.humidity,
        pressure:               day.pressure,
        windSpeed:              day.windSpeed,
        windGust:               day.windGust,
        cloudCover:             day.cloudCover,
        visibility:             day.visibility,
        temperatureMin:         day.temperatureMin,
        temperatureMax:         day.temperatureMax
      });
    });
  }
}

module.exports = Daily;