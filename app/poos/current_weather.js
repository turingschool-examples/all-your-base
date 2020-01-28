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

        // OR
  // const currentWeather = (currentWeather) =>
  //   ({
  //     summary:  currentWeather.summary,
  //     icon:  currentWeather.icon,
  //     precipIntensity:  currentWeather.precipIntensity,
  //     precipProbability:  currentWeather.precipProbability,
  //     temperature:  currentWeather.temperature,
  //     humidity:  currentWeather.humidity,
  //     pressure:  currentWeather.pressure,
  //     windSpeed:  currentWeather.windSpeed,
  //     windGust:  currentWeather.windGust,
  //     windBearing:  currentWeather.windBearing,
  //     cloudCover:  currentWeather.cloudCover,
  //     visibility:  currentWeather.visibility
  //   })
