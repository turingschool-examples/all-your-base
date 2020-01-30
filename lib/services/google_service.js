const apiQuerier = require('./api_querier')
// const dotenv = require('dotenv');
// dotenv.config();

const MAPS_URL = "https://maps.googleapis.com/maps/api"
const GEOCODE_PATH = "geocode/json"

async function getGeocode(location) {
  const url = `${MAPS_URL}/${GEOCODE_PATH}?address=${location}&key=${process.env.GOOGLE_GEOCODE_API_KEY}`
  return await apiQuerier.fetchAsync(url)
    .then(data => { return data; })
    .catch(reason => { console.log(reason.message) });
}

module.exports = { getGeocode };