const request = require('request')


const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=09aa13b65163372bac1752d3ae4ebddb&query=' + address
    request({ url, json: true}, (error, response) => {
        if(error) {
            callback('unable to load, check your connectivity')
        }
        else if( response.body.data.length === 0 || response.body.data === undefined ) {
            callback('unable to find weather address, search again')
        } else {
            const {latitude, longitude, continent} = response.body.data[0]
            callback( undefined, {
                latitude,
                longitude,
                continent
            })
        }
    })
}
const weathercode = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d0d3c831559018114ab5754f08d1b244&query=' + latitude +','+ longitude +'&units=f'
    request({ url, json: true}, (error, response) => {
        if(error){
            callback('unable to load country weather, check your connectivity')
        }
        else if(response.body.error){
            callback('invalid input, try again')
        } else {
            const {weather_descriptions, temperature, feelslike, wind_speed} = response.body.current
            const sentence = 'it is ' + weather_descriptions + '. it is ' + temperature + ' fahrenheit, it feels like ' + feelslike + ' fahrenheit. the wind speed is ' + wind_speed
            callback(undefined, sentence)
        }

    })
}


module.exports = {
    geocode: geocode,
    weathercode: weathercode
}