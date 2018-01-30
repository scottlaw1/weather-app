const request = require('request');

var geocodeAddress = (address) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
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
};

module.exports = {
  geocodeAddress
}
