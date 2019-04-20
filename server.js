const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var sslRedirect = require('heroku-ssl-redirect');

const app = express();

// get our request parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// to redirect http traffic to https
app.use(sslRedirect());

// in the dist directory
app.use(express.static(__dirname + '/dist'));
// app.use(express.static(__dirname + '/server'));
app.use(compression()); //compressing dist folder

var server_port = process.env.YOUR_PORT || process.env.PORT || 8080;
//var server_host = process.env.YOUR_HOST;

var server = app.listen(server_port, function() {
  var host = server.address().address || "127.0.0.1";
  console.log('Listening on port %d', server_port, 'host at:',host);
});
