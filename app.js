const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=2104%20Bucknell%20Terrace%20Silver%20Spring',
  json: true
}, (error, response, body) => {
  console.log(body);
});
