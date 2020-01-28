class HourlyForecast {

  constructor(forecast){
    this.summary = forecast.summary //?
    this.icon = forecast.icon  //?
    this.time = forecast.time
    this.summary = forecast.summary
    this.icon = forecast.icon
    this.precipIntensity = forecast.precipIntensity
    this.precipProbability = forecast.precipProbability
    this.temperature = forecast.temperature
    this.humidity = forecast.humidity
    this.pressure = forecast.pressure
    this.windSpeed = forecast.windSpeed
    this.windGust = forecast.windGust
    this.windBearing = forecast.windBearing
    this.cloudCover = forecast.cloudCover
    this.visibility = forecast.visibility
  }
}

module.exports = HourlyForecast;
