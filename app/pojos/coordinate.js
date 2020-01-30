class Coordinate {

  constructor(json){
    this.lat = json.results[0].geometry.location.lat
    this.lng = json.results[0].geometry.location.lat
  }
}

module.exports = Coordinate;
