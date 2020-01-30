class Location {

  constructor(location){
    this.location = location.split(',')[0].capitalize + ', ' + location.split(',')[0].upcase
  }
}

module.exports = Location;


// const location = (location) =>
//   ({
//
//   })
