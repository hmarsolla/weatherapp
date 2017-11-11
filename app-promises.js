const yargs = require("yargs");
const axios = require("axios");
const config = require("./config.js");

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
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`; 

axios.get(geocodeUrl).then((response) => {
    if(response.data.status == "ZERO_RESULTS"){
        throw new Error("Unable to find that address.")
    };
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${config.dsAPISecret}/${latitude},${longitude}${(isCelsius) ? "?units=si" : ""}`;

    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${Math.round(temperature)}${(isCelsius) ? "°C" : "°F"}.`);
    console.log(`It feels like ${Math.round(apparentTemperature)}${(isCelsius) ? "ºC" : "ºF"}.`);
}).catch((e) => {
    if(e.response.status == 404){
        console.log("Unable to connect to API Servers");    
    }else{
        console.log(e)
    };
});
