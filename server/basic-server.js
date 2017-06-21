var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
  res.send('Express!!!');
});


app.listen(3000, function() {
  console.log('Listening on port 3000');
});

// // specifiy port
// var port = 3000;
// // specify ip (set to localhost)
// var ip = '127.0.0.1';
//
// // create the server by calling the http createServer function
// var server = http.createServer(handler.handleRequest);
//
// server.listen(port, ip);
// console.log('Listening on http://' + ip + ':' + port);
