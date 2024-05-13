const express = require('express');
const innitWebRouter = require('../src/router/index');
const app = express();

 
innitWebRouter(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;