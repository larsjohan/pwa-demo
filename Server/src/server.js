const express = require('express');
const app = express();

app.get('/', (request, response) => {
  return response.send("Welcome to the PWA-Demo API");
});

app.listen(process.env.PORT || 8080);