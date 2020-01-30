var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test the forecast path', () => {
  beforeEach(async () => {
    await database.raw('truncate table users cascade');

    let user = {
      apiKey: 'asdf'
    };
    await database('users').insert(user, 'id');
  });

  afterEach(() => {
    database.raw('truncate table users cascade');
  });

  describe('test forecast GET', () => {
    it('happy path', async () => {
      const res = await request(app)
        .get("/api/v1/forecast?location=denver,co")
        .send({
          apiKey: 'asdf'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('location')
      expect(res.body).toHaveProperty('currently')
      expect(res.body.currently).toHaveProperty('summary')
      expect(res.body.currently).toHaveProperty('icon')
      expect(res.body.currently).toHaveProperty('precipIntensity')
      expect(res.body.currently).toHaveProperty('precipProbability')
      expect(res.body.currently).toHaveProperty('temperature')
      expect(res.body.currently).toHaveProperty('humidity')
      expect(res.body.currently).toHaveProperty('pressure')
      expect(res.body.currently).toHaveProperty('windSpeed')
      expect(res.body.currently).toHaveProperty('windGust')
      expect(res.body.currently).toHaveProperty('windBearing')
      expect(res.body.currently).toHaveProperty('cloudCover')
      expect(res.body.currently).toHaveProperty('visibility')

      expect(res.body).toHaveProperty('hourly')
      expect(res.body.hourly).toHaveProperty('summary')
      expect(res.body.hourly).toHaveProperty('icon')
      expect(res.body.hourly).toHaveProperty('data')
      expect(res.body.hourly.data[0]).toHaveProperty('time')
      expect(res.body.hourly.data[0]).toHaveProperty('summary')
      expect(res.body.hourly.data[0]).toHaveProperty('icon')
      expect(res.body.hourly.data[0]).toHaveProperty('precipIntensity')
      expect(res.body.hourly.data[0]).toHaveProperty('precipProbability')
      expect(res.body.hourly.data[0]).toHaveProperty('temperature')
      expect(res.body.hourly.data[0]).toHaveProperty('humidity')
      expect(res.body.hourly.data[0]).toHaveProperty('pressure')
      expect(res.body.hourly.data[0]).toHaveProperty('windSpeed')
      expect(res.body.hourly.data[0]).toHaveProperty('windGust')
      expect(res.body.hourly.data[0]).toHaveProperty('windBearing')
      expect(res.body.hourly.data[0]).toHaveProperty('cloudCover')
      expect(res.body.hourly.data[0]).toHaveProperty('visibility')
      // expect(res.body.length).toBe(7)
      expect(res.body).toHaveProperty('daily')
      expect(res.body.daily).toHaveProperty('summary')
      expect(res.body.daily).toHaveProperty('icon')
      expect(res.body.daily).toHaveProperty('data')
      expect(res.body.daily.data[0]).toHaveProperty('time')
      expect(res.body.daily.data[0]).toHaveProperty('summary')
      expect(res.body.daily.data[0]).toHaveProperty('icon')
      expect(res.body.daily.data[0]).toHaveProperty('sunriseTime')
      expect(res.body.daily.data[0]).toHaveProperty('sunsetTime')
      expect(res.body.daily.data[0]).toHaveProperty('precipIntensity')
      expect(res.body.daily.data[0]).toHaveProperty('precipIntensityMax')
      expect(res.body.daily.data[0]).toHaveProperty('precipIntensityMaxTime')
      expect(res.body.daily.data[0]).toHaveProperty('precipProbability')
      expect(res.body.daily.data[0]).toHaveProperty('precipType')
      expect(res.body.daily.data[0]).toHaveProperty('temperatureHigh')
      expect(res.body.daily.data[0]).toHaveProperty('temperatureLow')
      expect(res.body.daily.data[0]).toHaveProperty('humidity')
      expect(res.body.daily.data[0]).toHaveProperty('pressure')
      expect(res.body.daily.data[0]).toHaveProperty('windSpeed')
      expect(res.body.daily.data[0]).toHaveProperty('windGust')
      expect(res.body.daily.data[0]).toHaveProperty('cloudCover')
      expect(res.body.daily.data[0]).toHaveProperty('visibility')
      expect(res.body.daily.data[0]).toHaveProperty('temperatureMin')
      expect(res.body.daily.data[0]).toHaveProperty('temperatureMax')
    });
    
    it('sad path', async () => {
      const res = await request(app)
        .get("/api/v1/forecast?location=denver,co")
        .send({
          apiKey: 'fff'
        });

      expect(res.statusCode).toBe(401);
    });
  });
});
