const yargs = require("yargs");
const geocode = require("./geocode/geocode.js");
const weather = require("./weather/weather.js");

const argv = yargs
    .options({
        address : {
            demand : true,
            alias : "a",
            describe : "Address to fetch weather for.",
            string : true
        },
        fahrenheit:{
            alias: "f",
            boolean: true
        }
    })
    .help()
    .alias("help", "h")
    .argv;

var isCelsius = !argv.fahrenheit;
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }else{
        console.log(results.address);
        weather.getWeather(results.latitude,results.longitude, isCelsius, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            }else{
                console.log(`It's currently ${Math.round(weatherResults.temperature)}${(isCelsius) ? "°C" : "°F"}.`);
                console.log(`It feels like ${Math.round(weatherResults.apparentTemperature)}${(isCelsius) ? "ºC" : "ºF"}.`);
            }
        });
    }
});

