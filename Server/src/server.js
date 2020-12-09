const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const jsonParser = bodyParser.json();

app.use(jsonParser);

const FENCES = [];

function Point(lat, lon) {
  this.lat = lat;
  this.lon = lon;
}

function Fence(name, points = []) {
  this.id = FENCES.length;
  this.points = points;
  this.name = name || `Fence${FENCES.length}`;
}


app.get('/api', (req, res) => {
  console.log('[GET][/api]');
  return res.send('Welcome to the PWA-Demo API');
});

app.get('/api/fence/:fenceId', (req, res) => {
  const id = req.params['fenceId'] || -1;
  console.log(`[GET][/api/fence/${id}]`);

  if (id === -1) {
    return res.status(400).send('Invalid ID');
  }
  const fence = FENCES.find(f => Number(f.id) === Number(id));
  if (!fence) {
    return res.status(404).send("Fence not found");
  }
  return res.status(200).contentType('application/json').send(fence);
});

app.get('/api/fences', (req, res) => {
  console.log('[GET][/api/fences]');
  return res.status(200).contentType('application/json').send(FENCES);
});

app.post('/api/fences', (req, res) => {
  const fence = req.body;
  console.log('[POST][/fences] Attempting to save fence: ', fence);
  if (!fence || !fence.hasOwnProperty('name') || !fence.hasOwnProperty('points')) {
    return res.status(400).send('body must be of type: Fence');
  }
  if (!Array.isArray(fence.points) || fence.points.length <= 2) {
    return res.status(400).send('A fence must have at least 3 points');
  }
  if (fence.points.some(p => !p.lat || !p.lon)) {
    return res.status(400).send('All provided points must specify coordinates \'lat\' and \'lon\'');
  }
  const fenceInstance = new Fence(fence.name, fence.points.map(p => new Point(p.lat, p.lon)));
  FENCES.push(fenceInstance);
  return res.status(200).contentType('application/json').send(fenceInstance);
});

app.listen(process.env.PORT || 8080);