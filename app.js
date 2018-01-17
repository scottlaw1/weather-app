const request = require('request');
const yargs = require('yargs');

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

console.log(argv);
var encodedAddress = encodeURIComponent(argv.address);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
}, (error, response, body) => {
  //How to pretty print to the console
  //console.log(JSON.stringify(response, undefined, 4));
  if (error){
    console.log('Unable to connect to Google servers.');
  } else if (body.status === 'ZERO_RESULTS'){ //Specific to Google's geocode API
    console.log('Unable to find that address.');
  } else if (body.status === 'OVER_QUERY_LIMIT'){
    console.log(error_message);
  } else if (body.status === 'OK'){
    var result = body.results[0];
    console.log(`Address: ${result.formatted_address}`);
    console.log(`Latitude: ${result.geometry.location.lat}`);
    console.log(`Longitude: ${result.geometry.location.lng}`);
  }
});
