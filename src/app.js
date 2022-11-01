const express = require('express')
const app = express()

const path = require('path')
const hbs = require('hbs') 

const weatherInfo = require('./utils/weather-check')
const port = process.env.PORT || 3000

// define paths for express configs 
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handle bars engine and views loaction
app.set('views', viewPath)
app.set('view engine', 'hbs')         // this is the engine that provide dynamic content in the web page
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicPath))      // we tell express to use public directory

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'amr'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        picName: 'captain levi ackerman',
        title: 'about page',
        name: 'amr'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'here for help',
        title: 'help page',
        name: 'amr'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'error, please provide an address'
        })
    }
    const location = req.query.address
    weatherInfo.geocode(location, (error, {latitude, longitude, continent} = {}) => {
        if(error){
            return res.send({ error})
        } 
        
        weatherInfo.weathercode(latitude, longitude, (error, dataForecast) => {
            if(error) {
                return res.send({error})
            }
            return res.send({
                address: location + ', ' + continent,
                message: dataForecast
            })
        })
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'error, you must include a search'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errormessage: 'help article not found',
        name: 'amr'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errormessage: 'page not found',
        name: 'amr'
    })
})
app.listen(port, () => {
    console.log('server is up to port ' + port)
})