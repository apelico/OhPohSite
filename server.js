const PORT = process.env.PORT || 3000;
const path = require('path');
var http = require('http');
var express = require('express');
var app = express();
app.set('port', PORT);
app.use(express.static('public'));

// default Heroku PORT
app.listen(process.env.PORT || 3000);

// Serve static files....
app.use(express.static(__dirname + '/dist/OhPoh'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/OhPoh/index.html'));
});
