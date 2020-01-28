// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/sweater_weather_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/sweater_weather_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://dixnbuxpuaefhc:2b8a6cc1cdec7f61fe776493a1b92def778b89958873de79f0de896c0a16760c@ec2-23-21-13-88.compute-1.amazonaws.com:5432/d3ajo921i1t8gj',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
