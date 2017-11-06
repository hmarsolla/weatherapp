const request = require("request");
const config = require("../config.js");

var getWeather = (latitude, longitude, units, callback) => {
    var apiUrl = `https://api.darksky.net/forecast/${config.dsAPISecret}/${latitude},${longitude}${(units) ? "?units=si" : ""}`;

    request({
        url: apiUrl,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }else {
            callback("Unable to retrieve weather data.");
        };
    });
};

module.exports = {
    getWeather
};