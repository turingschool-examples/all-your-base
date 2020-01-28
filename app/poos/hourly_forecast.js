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

//           OR
// const hourlyForecast = (hourlyForecast) =>
//   ({
//     summary: hourlyForecast.summary, //?
//     icon: hourlyForecast.icon,  //?
//     time: hourlyForecast.time,
//     summary: hourlyForecast.summary,
//     icon: hourlyForecast.icon,
//     precipIntensity: hourlyForecast.precipIntensity,
//     precipProbability: hourlyForecast.precipProbability,
//     temperature: hourlyForecast.temperature,
//     humidity: hourlyForecast.humidity,
//     pressure: hourlyForecast.pressure,
//     windSpeed: hourlyForecast.windSpeed,
//     windGust: hourlyForecast.windGust,
//     windBearing: hourlyForecast.windBearing,
//     cloudCover: hourlyForecast.cloudCover,
//     visibility: hourlyForecast.visibility,
//   })
