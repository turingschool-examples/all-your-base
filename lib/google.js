// Build node-fetch service object here
const fetch = require('node-fetch');
const dotenv = require('dotenv');
var keys = dotenv.config()['parsed'];
var location = 'denver,co';

var google_url =`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${keys['GOOGLE_API_KEY']}`;

async function fetchLocationAsync() {
  try {
    let response = await fetch(google_url);
    let location_data = await response.json();
    return location_data;
  } catch(err) {
    console.log(err);
  }
}

// This is how we use our async function
fetchLocationAsync()
    .then(location_data => console.log(location_data['results'][0]['geometry']['location']))
    .catch(reason => console.log(reason.message))

// const getData = async url => {
//   try {
//     const response = await fetch(url);
//     const json = await response.json();
//     console.log(json['results'][0]['geometry']['location']);
//   } catch (error) {
//     console.log(error);
//   }
// };
//
// getData(url);

// fetch(url, { method: 'get'})
//   .then((res) => {
//      return res.json()
// })
// .then((json) => {
//   console.log(json);
//   // Do something with the returned data.
// });
