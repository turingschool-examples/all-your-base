const request = require('request')
require('dotenv').config({'/.env'})

class DarkSkyService {
  static getForecast(coordinate){
    getJSON(coordinate)
  }

  static connection(coordinate) {
    request(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${coord.lat},${coord.lng}`, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      console.log(body.url);
      console.log(body.explanation);
    });
  }

  static getJSON(coordinate) {
    response = connection(coordinate)
    JSON.parse(response.body, symbolize_names: true)
  }
}
