var shell = require('shelljs');
var request = require("supertest");
var app = require('../../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test the favorites path', () => {
  beforeEach(async () => {
    await database.raw('truncate table users cascade');

    let userData = {
      apiKey: 'asdf'
    };
    await database('users').insert(userData, 'id');

    let user = await database('users').select().first()
    let favoriteParams = {
      user_id: user.id,
      location: 'Denver, CO',
      lat: 38.7773,
      lng: -90.4836,
    }
    await database('favorites').insert(favoriteParams, 'id');
  });

  afterEach(() => {
    database.raw('truncate table users cascade');
  });

  describe('test favorites deletion', () => {
    it('happy path', async () => {
      const res = await request(app)
        .delete("/api/v1/favorites")
        .send({
          location: 'Denver, CO',
          api_key: 'asdf'
        });

      let favorites = await database('favorites').select()
      expect(favorites.length).toBe(0);
      
      expect(res.statusCode).toBe(204);
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
