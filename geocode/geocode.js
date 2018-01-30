const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error){
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS'){ //Specific to Google's geocode API
      callback('Unable to find that address.');
    } else if (body.status === 'OVER_QUERY_LIMIT'){
      callback(error_message);
    } else if (body.status === 'OK'){
      callback(undefined,{
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  });
};

module.exports = {
  geocodeAddress
}
