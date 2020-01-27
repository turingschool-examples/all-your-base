// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/sweater_weather_express_dev',
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
    connection: 'postgres://localhost/sweater_weather_express_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://rnnzoyjoynebtm:f852dac6a0d21c6108fa0dd3967fd4d956f1483d0d81823af9698d4bb3fa233e@ec2-3-220-86-239.compute-1.amazonaws.com:5432/d3ikhmvjh99jfo',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
