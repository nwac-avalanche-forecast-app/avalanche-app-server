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

app.get('/forecasts/:zone/', (req, res) => {
    const url = NWAC_URL + '/avalanche-region-forecast/?format=json&zone=' + req.params.zone;
    const bottom_line_summary = req.query.bottom_line_summary
    const day1_danger_elev_high = req.query.day1_danger_elev_high
    const day1_danger_elev_med = req.query.day1_danger_elev_med
    const day1_danger_elev_low = req.query.day1_danger_elev_low
    const problems = req.query.problems
    
    superagent
        .get(NWAC_URL + `/avalanche-region-forecast/?format=json&zone=${zone}`)
        .then(data => {
            res.send(JSON.parse(data.text).objects)
    }).catch(result => {
        console.log("error not working", result);
    });
});

app.get('/zones', (req, res) => {
  superagent
    .get(NWAC_URL + '/zone/?format=json')
    .then(data => res.send(JSON.parse(data.text).objects));
});

app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });