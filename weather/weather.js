const request = require("request");

var getWeather = (latitude, longitude, units, callback) => {
    var apiUrl = `https://api.darksky.net/forecast/ec4ea1f23aafad908948c8345d1db1b7/${latitude},${longitude}${(units) ? "?units=si" : ""}`;

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