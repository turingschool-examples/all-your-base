## Setup

[![Build Status](https://travis-ci.com/iandouglas/all-your-base.svg?branch=master)](https://travis-ci.com/iandouglas/all-your-base)

```
npm install

# set up dev database
createdb publications-dev
knex migrate:latest
knex seed:run

# set up test database
createdb publications-test
knex migrate:latest --env test

# run your tests
npm test
```
