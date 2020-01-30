class Daily {

  constructor(args) {
    this.time                   = args.time
    this.summary                = args.summary
    this.icon                   = args.icon
    this.sunriseTime            = args.sunriseTime
    this.sunsetTime             = args.sunsetTime
    this.precipIntensity        = args.precipIntensity
    this.precipIntensityMax     = args.precipIntensityMax
    this.precipIntensityMaxTime = args.precipIntensityMaxTime
    this.precipProbability      = args.precipProbability
    this.precipType             = args.precipType
    this.temperatureHigh        = args.temperatureHigh
    this.temperatureLow         = args.temperatureLow
    this.humidity               = args.humidity
    this.pressure               = args.pressure
    this.windSpeed              = args.windSpeed
    this.windGust               = args.windGust
    this.cloudCover             = args.cloudCover
    this.visibility             = args.visibility
    this.temperatureMin         = args.temperatureMin
    this.temperatureMax         = args.temperatureMax
  }
}

module.exports = Daily;