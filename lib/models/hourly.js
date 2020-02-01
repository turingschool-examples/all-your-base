class Hourly {

  constructor(args) {
    this.summary = args.summary
    this.icon = args.icon
    this.data = []
    this.formatHourlyData(args.data)
  }
  
  formatHourlyData(data) {
    data.forEach(hour => {
      this.data.push({
        time:              hour.time,
        summary:           hour.summary,
        icon:              hour.icon,
        precipIntensity:   hour.precipIntensity,
        precipProbability: hour.precipProbability,
        temperature:       hour.temperature,
        humidity:          hour.humidity,
        pressure:          hour.pressure,
        windSpeed:         hour.windSpeed,
        windGust:          hour.windGust,
        windBearing:       hour.windBearing,
        cloudCover:        hour.cloudCover,
        visibility:        hour.visibility
      });
    });
  }
}

module.exports = Hourly;