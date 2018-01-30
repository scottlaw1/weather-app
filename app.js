const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage){
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});

request({
  url: `https://api.darksky.net/forecast/a870a33fe1882f79763b3ffca5da4fd6/39.0939518,-77.0213375`,
  json: true
}, (error, response, body) => {
  if (!error && response.statusCode === 200){
    console.log(`Current temperature at Mom & Dad's: ${body.currently.temperature}F`);
  } else {
    console.log('Unable to fetch weather')
  }
});
