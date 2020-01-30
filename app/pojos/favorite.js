class Favorite {

  constructor(response){
    this.location = response.location
    this.current_weather = new CurrentWeather(response)
  }
}

module.exports = Favorite;

// const favorite = (favorite) =>
//   ({
//
//   })
