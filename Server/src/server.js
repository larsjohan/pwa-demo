const express = require('express');
const app = express();

const FENCES = [];

function Point(lat, lon) {
  this.lat = lat;
  this.lon = lon;
}

function Fence(points = []) {
  this.id = FENCES.length;
  this.points = points;
}


app.get('/', (req, res) => {
  return res.send('Welcome to the PWA-Demo API');
});

app.get('/fences', (req, res) => {
  return res.status(200).contentType('application/json').send(FENCES);
});

app.post('/fence', (req, res) => {
  const points = req.body;
  if (!points || !Array.isArray(points) || points.length === 0) {
    return res.status(400).send('body must be array of points: [{lat: \'latitude\', lon: \'longitude\'}]');
  }
  const fence = new Fence(points.map(p => new Point(p.lat, p.lon)));
  FENCES.push(fence);
  return res.status(200).contentType('application/json').send(fence);
})

app.listen(process.env.PORT || 8080);