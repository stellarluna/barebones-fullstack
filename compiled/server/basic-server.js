'use strict';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9iYXNpYy1zZXJ2ZXIuanMiXSwibmFtZXMiOlsiaHR0cCIsInJlcXVpcmUiLCJoYW5kbGVyIiwicG9ydCIsImlwIiwic2VydmVyIiwiY3JlYXRlU2VydmVyIiwiaGFuZGxlUmVxdWVzdCIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsT0FBT0MsUUFBUSxNQUFSLENBQVg7QUFDQSxJQUFJQyxVQUFVRCxRQUFRLG1CQUFSLENBQWQ7O0FBS0E7QUFDQSxJQUFJRSxPQUFPLElBQVg7QUFDQTtBQUNBLElBQUlDLEtBQUssV0FBVDs7QUFFQTtBQUNBLElBQUlDLFNBQVNMLEtBQUtNLFlBQUwsQ0FBa0JKLFFBQVFLLGFBQTFCLENBQWI7O0FBRUFGLE9BQU9HLE1BQVAsQ0FBY0wsSUFBZCxFQUFvQkMsRUFBcEI7QUFDQUssUUFBUUMsR0FBUixDQUFZLHlCQUF5Qk4sRUFBekIsR0FBOEIsR0FBOUIsR0FBb0NELElBQWhEIiwiZmlsZSI6ImJhc2ljLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xudmFyIGhhbmRsZXIgPSByZXF1aXJlKCcuL3JlcXVlc3QtaGFuZGxlcicpO1xuXG5cblxuXG4vLyBzcGVjaWZpeSBwb3J0XG52YXIgcG9ydCA9IDMwMDA7XG4vLyBzcGVjaWZ5IGlwIChzZXQgdG8gbG9jYWxob3N0KVxudmFyIGlwID0gJzEyNy4wLjAuMSc7XG5cbi8vIGNyZWF0ZSB0aGUgc2VydmVyIGJ5IGNhbGxpbmcgdGhlIGh0dHAgY3JlYXRlU2VydmVyIGZ1bmN0aW9uXG52YXIgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoaGFuZGxlci5oYW5kbGVSZXF1ZXN0KTtcblxuc2VydmVyLmxpc3Rlbihwb3J0LCBpcCk7XG5jb25zb2xlLmxvZygnTGlzdGVuaW5nIG9uIGh0dHA6Ly8nICsgaXAgKyAnOicgKyBwb3J0KTtcbiJdfQ==