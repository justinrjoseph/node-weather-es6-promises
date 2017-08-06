const request = require('request');

function processAddress(address) {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);

    let baseUrl = 'http://maps.googleapis.com/maps/api/geocode/json';
    const url = `${baseUrl}?address=${encodedAddress}`;
    
    request({
      url,
      json: true
    }, (error, response, body) => {
      if ( error ) {
        reject('There was a problem connecting to the Google API.');
      } else {
        if ( body.status === 'ZERO_RESULTS' ) {
          reject(`The Google API could not locate '${address}'`)
        } else {
          let results = body.results[0];
          let location = results.geometry.location;

          resolve({
            address: results.formatted_address,
            lat: location.lat,
            lng: location.lng
          });
        }
      }
    });
  });
}

module.exports = {
  processAddress
};
