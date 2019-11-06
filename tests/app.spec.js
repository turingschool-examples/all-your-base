var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

describe('Test the root path', () => {
  test('It should respond to the GET method', () => {
    const res = await request(app)
      .get("/");

    expect(res.statusCode).toBe(200);
  });
});
