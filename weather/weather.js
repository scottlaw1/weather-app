const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/a870a33fe1882f79763b3ffca5da4fd6/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200){
      callback(undefined,{
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    } else {
      callback('Unable to fetch weather')
    }
  });
};

module.exports.getWeather = getWeather;
