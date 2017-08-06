const request = require('request');

function fetch(coords) {
  return new Promise((resolve, reject) => {
    let { lat, lng } = coords;

    let apiKey = '7f5c1aa8ac29c8f5c3e9671f7e683122';
    const url = `https://api.forecast.io/forecast/${apiKey}/${lat},${lng}`;

    request({
      url,
      json: true
    }, (error, response, body) => {
      if ( response.statusCode === 200 ) {
        resolve({
          temperature: {
            actual: body.currently.temperature,
            apparent: body.currently.apparentTemperature
          }
        });
      } else {
        reject('Unable to fetch the requested weather.');
      }
    });
  });
}

module.exports = {
  fetch
};
