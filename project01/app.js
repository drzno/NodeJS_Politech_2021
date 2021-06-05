const express = require("express");
var request = require('request');

let app = express();

app.get('/weather/:city', (req, res) => {
    var city = req.params["city"];
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=d8830daa4834e3d5b70c6cd771652823&lang=ru`

    request(url, function (error, response, body) {
        let weather_json = JSON.parse(body);

        var weather = {
            city: weather_json.name,
            temperature: weather_json.main.temp,
            description: weather_json.weather[0].description,
            pressure: weather_json.main.pressure,
            humidity: weather_json.main.humidity,
            icon: weather_json.weather[0].icon
        }

        var weather_data = {weather: weather};

        res.render('weather.hbs', weather_data)
    })

});

app.get('/', (req, res) => {
    res.render('weather0.hbs')
});
app.get('/login', (req, res) => {
    res.send("Логін");
});
app.get('/weather/:city', (req, res) => {
    res.send(req.params["city"]);
});
app.use(function(req, res, next) {
    var err = new Error('404 Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000");
});

const hbs = require("hbs");
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

