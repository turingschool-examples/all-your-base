var shell = require('shelljs');
var request = require("supertest");
var service = require('../../lib/services/google_service');

describe('Test ', () => {
  test('It should get a json response from the API', async () => {
    let response = await service.getGeocode('denver,co')

    expect(response).toHaveProperty('results')
    expect(response.results[0]).toHaveProperty('geometry')
    expect(response.results[0].geometry).toHaveProperty('location')
    expect(response.results[0].geometry.location).toHaveProperty('lat')
    expect(response.results[0].geometry.location).toHaveProperty('lng')
  });
});
