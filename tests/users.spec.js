var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test the favorite path', () => {
  beforeEach(async () => {
    await database.raw('truncate table users cascade');

    let user = {
      email: 'lrs8810@gmail.com',
      api_key: '1234'
    };
    await database('users').insert(user, 'id');
  });

  afterEach(() => {
    database.raw('truncate table users cascade');
  });

  describe('test favorite GET', () => {
    it.skip('happy path', async () => {
      const res = await request(app)
        .get("/api/v1/users");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);

      expect(res.body[0]).toHaveProperty('email');
      expect(res.body[0].email).toBe('lrs8810@gmail.com');

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);

      expect(res.body[0]).toHaveProperty('api_key');
      expect(res.body[0].email).toBe('1234');
    });
  });
});
