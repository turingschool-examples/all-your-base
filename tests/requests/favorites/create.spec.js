var shell = require('shelljs');
var request = require("supertest");
var app = require('../../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test the forecast path', () => {
  beforeEach(async () => {
    await database.raw('truncate table users cascade');
    await database.raw('truncate table favorites cascade');

    let user = {
      apiKey: 'asdf'
    };
    await database('users').insert(user, 'id');
  });

  afterEach(() => {
    database.raw('truncate table users cascade');
    database.raw('truncate table favorites cascade');
  });

  describe('test forecast GET', () => {
    it('happy path', async () => {
      const res = await request(app)
        .post("/api/v1/favorites")
        .send({
          location: 'Denver, CO',
          api_key: 'asdf'
        });

      expect((await database('favorites').select()).length()).toBe(1)

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message')
      expect(res.body.location).toBe('Denver, CO has been added to your favorites')
    });
    
    it('sad path', async () => {
      const res = await request(app)
        .post("/api/v1/favorites")
        .send({
          location: 'Denver, CO',
          api_key: 'fff'
        });

      expect(res.statusCode).toBe(401);
    });
  });
});
