var utils = require('./utils');
var url = require('url');
var fs = require('fs');

exports.handleRequest = function(request, response) {
  // use the parse method of the url core module to get specifically
  // the pathname of the request.url
  var urlPath = url.parse(request.url).pathname;
  // if request.method === 'GET'
  if (request.method === 'GET') {
    // read the file in the file system that matches the url endpoint
    if (urlPath === '/') {
      fs.readFile(__dirname + urlPath, function(err, data) {
        if (err) {
          // response.writeHead(404, utils.headers);
          // response.end();
          utils.send404(response);
        } else {
          // response.writeHead(200, utils.headers);
          utils.sendResponse(response, data, 200);
        }
      });
    }
    if (urlPath === 'flower') {
      fs.readFile(__dirname + urlPath, function(err, data) {
        if (err) {
          utils.send404(response);
        } else {
          utils.sendResponse(response, data, 200);
        }
      });
    }
  }
  // if request.method === 'POST'
  if (request.method === 'POST') {
    
  }
  // if request.method === 'PUT'

  // if request.method === 'DELETE'

}
