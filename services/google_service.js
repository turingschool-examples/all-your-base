const fetch = require('node-fetch');

class GoogleService {

  constructor(location) {
    this.location = location;
    this.lattitudeAndLong = null;
  }

  getLatAndLng() {
    console.log(this.location);
    let location  = this.location;
    let googleApiKey = process.env.GOOGLE_API_KEY;

    let url =`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`;
    fetch(url, { method: 'GET'})
      .then((response) => {
         return response.json();
    })
    .then((json) => {
      let googleGeocodeResponse = json;
      let latAndLng = Object.values(googleGeocodeResponse.results[0].geometry.location);
      console.log(`the lat and long of the searched for location are ${latAndLng}`);
      this.lattitudeAndLong = latAndLng;
    })
    .catch((error) => {
       response.status(500).json({ error });
     });
  }

}
module.exports = GoogleService;