'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '../client'));

app.get('/', function (req, res) {
  res.send('Express!!!');
});

app.listen(3000, function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9iYXNpYy1zZXJ2ZXIuanMiXSwibmFtZXMiOlsiZXhwcmVzcyIsInJlcXVpcmUiLCJhcHAiLCJ1c2UiLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJnZXQiLCJyZXEiLCJyZXMiLCJzZW5kIiwibGlzdGVuIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxVQUFVQyxRQUFRLFNBQVIsQ0FBZDtBQUNBLElBQUlDLE1BQU1GLFNBQVY7O0FBR0FFLElBQUlDLEdBQUosQ0FBUUgsUUFBUUksTUFBUixDQUFlQyxZQUFZLFdBQTNCLENBQVI7O0FBRUFILElBQUlJLEdBQUosQ0FBUSxHQUFSLEVBQWEsVUFBU0MsR0FBVCxFQUFjQyxHQUFkLEVBQW1CO0FBQzlCQSxNQUFJQyxJQUFKLENBQVMsWUFBVDtBQUNELENBRkQ7O0FBS0FQLElBQUlRLE1BQUosQ0FBVyxJQUFYLEVBQWlCLFlBQVc7QUFDMUJDLFVBQVFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNELENBRkQ7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmFzaWMtc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG52YXIgYXBwID0gZXhwcmVzcygpO1xuXG5cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoX19kaXJuYW1lICsgJy4uL2NsaWVudCcpKTtcblxuYXBwLmdldCgnLycsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gIHJlcy5zZW5kKCdFeHByZXNzISEhJyk7XG59KTtcblxuXG5hcHAubGlzdGVuKDMwMDAsIGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnTGlzdGVuaW5nIG9uIHBvcnQgMzAwMCcpO1xufSk7XG5cbi8vIC8vIHNwZWNpZml5IHBvcnRcbi8vIHZhciBwb3J0ID0gMzAwMDtcbi8vIC8vIHNwZWNpZnkgaXAgKHNldCB0byBsb2NhbGhvc3QpXG4vLyB2YXIgaXAgPSAnMTI3LjAuMC4xJztcbi8vXG4vLyAvLyBjcmVhdGUgdGhlIHNlcnZlciBieSBjYWxsaW5nIHRoZSBodHRwIGNyZWF0ZVNlcnZlciBmdW5jdGlvblxuLy8gdmFyIHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGhhbmRsZXIuaGFuZGxlUmVxdWVzdCk7XG4vL1xuLy8gc2VydmVyLmxpc3Rlbihwb3J0LCBpcCk7XG4vLyBjb25zb2xlLmxvZygnTGlzdGVuaW5nIG9uIGh0dHA6Ly8nICsgaXAgKyAnOicgKyBwb3J0KTtcbiJdfQ==