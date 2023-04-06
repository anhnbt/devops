var express = require('express')
require('dotenv').config();

var app = express();

app.get('/', function (req, res) {  
 res.send('Hello World!');
});

app.listen(process.env.APP_PORT, function () {
  console.log(`app listening on port ${process.env.APP_PORT}!`);
});