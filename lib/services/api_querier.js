const fetch = require('node-fetch')

async function fetchAsync(url) {
  let response = await fetch(url);
  let json = await response.json();
  return json;
}

module.exports = {
  fetchAsync
};