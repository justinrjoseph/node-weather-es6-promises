const yargs = require('yargs');

const geocode = require('./geocode'),
      weather = require('./weather');

const argv = yargs
  .options({
    a: {
      describe: 'Address to fetch weather for',
      demand: true,
      string: true,
      alias: 'address'
    }
  })
  .alias('help', 'h')
  .help()
  .argv;

let address = argv.a || argv.address;

geocode.processAddress(address)
  .then(
    (location) => {
      weather.fetch(location)
        .then(
          (results) => {
            console.log(`\nAt ${location.address}:\n`);
            console.log(`It's currently ${results.temperature.actual} degrees.`);
            console.log(`It feels like ${results.temperature.apparent} degrees.`);
          }
        )
        .catch((errorMsg) => {
          console.log(errorMsg);
        });
    }
  )
  .catch((errorMsg) => {
    console.log(errorMsg);
  });
