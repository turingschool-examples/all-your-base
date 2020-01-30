class Currently {

  constructor(args) {
    this.summary = args.summary
    this.icon = args.icon
    this.precipIntensity = args.precipIntensity
    this.precipProbability = args.precipProbability
    this.temperature = args.temperature
    this.humidity = args.humidity
    this.pressure = args.pressure
    this.windSpeed = args.windSpeed
    this.windGust = args.windGust
    this.windBearing = args.windBearing
    this.cloudCover = args.cloudCover
    this.visibility = args.visibility
  }
}

module.exports = Currently;