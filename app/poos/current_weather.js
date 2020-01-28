class CurrentWeather {

  constructor(response){
    this.summary = response.summary
    this.icon = response.icon
    this.precipIntensity = response.precipIntensity
    this.precipProbability = response.precipProbability
    this.temperature = response.temperature
    this.humidity = response.humidity
    this.pressure = response.pressure
    this.windSpeed = response.windSpeed
    this.windGust = response.windGust
    this.windBearing = response.windBearing
    this.cloudCover = response.cloudCover
    this.visibility = response.visibility
  }
}

module.exports = CurrentWeather; 
