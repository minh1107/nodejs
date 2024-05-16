const express = require('express');
const innitWebRouter = require('../src/router/index');
const setupSwagger = require('../src/config/index')

const app = express();
var bodyParser = require('body-parser')

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
innitWebRouter(app);
setupSwagger(app);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

module.exports = app;