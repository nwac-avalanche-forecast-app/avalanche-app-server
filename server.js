'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const superagent = require('superagent');

const app = express();
const NWAC_URL = 'http://www.nwac.us/api/v2';
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(express.static('./public'));

app.get('/forecasts/:zone', (req, res) => {
  const url = NWAC_URL + '/avalanche-region-forecast/?format=json&zone=' + req.params.zone;

  superagent
    .get(url)
    .then(data => res.send(JSON.parse(data.text).objects));
});

app.get('/forecasts/:zone/bottom_line_summary', (req, res) => {
    const weather = req.query.weather
    const avalancheDanger = req.query.avalancheDanger
    const avalancheForecast = req.query.avalancheForecast
    const healthLabel = req.query.

    superagent
        .get(NWAC_URL + `/avalanche-region-forecast/?format=json&zone=${zone}`)
        .then(function (result) {
         console.log("working", result)
    })
    .catch(result => console.log("error not working", result))
})

app.get('/zones', (req, res) => {
  superagent
    .get(NWAC_URL + '/zone/?format=json')
    .then(data => res.send(JSON.parse(data.text).objects));
});