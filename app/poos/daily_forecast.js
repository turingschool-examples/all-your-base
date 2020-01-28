class DailyForecast {

  constructor(forecast){
    this.summary = forecast.summary //?
    this.icon = forecast.icon  //?
    this.time = forecast.time
    this.summary = forecast.summary
    this.icon = forecast.icon
    this.sunriseTime = forecast.sunriseTime
    this.sunsetTime = forecast.sunsetTime
    this.precipIntensity = forecast.precipIntensity
    this.precipIntensityMax = forecast.precipIntensityMax
    this.precipIntensityMaxTime = forecast.precipIntensityMaxTime
    this.precipProbability = forecast.precipProbability
    this.precipType = forecast.precipType
    this.temperatureHigh = forecast.temperatureHigh
    this.temperatureLow = forecast.temperatureLow
    this.humidity = forecast.humidity
    this.pressure = forecast.pressure
    this.windSpeed = forecast.windSpeed
    this.windGust = forecast.windGust
    this.cloudCover = forecast.cloudCover
    this.visibility = forecast.visibility
    this.temperatureMin = forecast.temperatureMin
    this.temperatureMax = forecast.temperatureMax

  }
}

module.exports = DailyForecast;
