// Note: This request to the Google geocode api is wrapped in a promise because
// the api doesn't support promises natively.
const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve,reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
      json: true
    }, (error, response, body) => {
      if (body.status === 'OK'){
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      } else if (error){
        reject('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS'){
        reject('Unable to find that address.');
      } else {
        reject('Some other issue.')
      }
    });
  });
};

geocodeAddress('709 Milshire Court').then((location) => {
  console.log(JSON.stringify(location,undefined,2));
}, (errorMessage) => {
  console.log(errorMessage);
})
