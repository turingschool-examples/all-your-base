var shell = require('shelljs');
var request = require("supertest");
var service = require('../../lib/services/api_querier');

describe('Test ', () => {
  test('It should get a json response from the API', async () => {
    const MAPS_URL = "https://maps.googleapis.com/maps/api"
    const GEOCODE_PATH = "geocode/json"
    const url = `${MAPS_URL}/${GEOCODE_PATH}?address=denver,co&key=${process.env.GOOGLE_GEOCODE_API_KEY}`

    let response = await service.fetchAsync(url)

    expect(response).toHaveProperty('results')
    expect(response.results[0]).toHaveProperty('geometry')
    expect(response.results[0].geometry).toHaveProperty('location')
    expect(response.results[0].geometry.location).toHaveProperty('lat')
    expect(response.results[0].geometry.location).toHaveProperty('lng')
  });
});
