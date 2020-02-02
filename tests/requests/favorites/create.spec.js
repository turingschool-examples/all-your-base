var shell = require('shelljs');
var request = require("supertest");
var app = require('../../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test the favorites path', () => {
  beforeEach(async () => {
    await database.raw('truncate table users cascade');

    var user = {
      apiKey: 'asdf'
    };
    await database('users').insert(user, 'id');
  });

  afterEach(() => {
    database.raw('truncate table users cascade');
  });

  describe('test favorites creation', () => {
    it('happy path', async () => {
      const res = await request(app)
        .post("/api/v1/favorites")
        .send({
          location: 'Denver, CO',
          api_key: 'asdf'
        });

      let user      = await database('users').select()
      let favorites = await database('favorites').select()
      expect(favorites.length).toBe(1);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('Denver, CO has been added to your favorites');

      let addedFavorite = favorites[0]
      expect(addedFavorite.user_id).toBe(user[0].id);
      expect(addedFavorite.location).toBe('Denver, CO');
      expect(addedFavorite.lat).toBe(38.7773);
      expect(addedFavorite.lng).toBe(-90.4836);
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
