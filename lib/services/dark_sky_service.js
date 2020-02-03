const apiQuerier = require('./api_querier')
// const dotenv = require('dotenv');
// dotenv.config();

const DARK_SKY_URL = "https://api.darksky.net"

async function getWeather(coordinate) {
  const url = `${DARK_SKY_URL}/forecast/${process.env.DARK_SKY_API_KEY}/${coordinate.lat},${coordinate.lng}`
  return await apiQuerier.fetchAsync(url)
    .then(data => { return data; })
    .catch(reason => { console.log(reason.message) });
}

module.exports = { getWeather };