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
