var http = require('http');
var handler = require('./request-handler');

// specifiy port
var port = 3000;
// specify ip (set to localhost)
var ip = '127.0.0.1';

// create the server by calling the http createServer function
var server = http.createServer(handler.handleRequest);

server.listen(port, ip);
console.log('Listening on http://' + ip + ':' + port);
