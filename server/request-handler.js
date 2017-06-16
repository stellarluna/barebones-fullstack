var utils = require('./utils');
var url = require('url');
var fs = require('fs');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'garden'
});

exports.handleRequest = function(request, response) {
  // use the parse method of the url core module to get specifically
  // the pathname of the request.url
  var urlPath = url.parse(request.url).pathname;
  // if request.method === 'GET'
  if (request.method === 'GET') {
    // read the file in the file system that matches the url endpoint
    if (urlPath === '/') {
      utils.sendResponse(response, 'working?', 200);

      // fs.readFile(__dirname + urlPath, function(err, data) {
      //   if (err) {
      //     // response.writeHead(404, utils.headers);
      //     // response.end();
      //     utils.send404(response);
      //   } else {
      //     // response.writeHead(200, utils.headers);
      //     utils.sendResponse(response, data, 200);
      //   }
      // });
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
    // insert into flower when urlPath === '/flower'
    if (urlPath === '/flower') {
      // send "This is a flower"
      // connection.query('INSERT INTO flower VALUES(rose, red, northwest)', function(err, ))
      utils.sendResponse(response, 'This is a flower', 200);

    } else if (urlPath === '/petal') {
      utils.sendResponse(response, 'This is a petal', 200);
    }
  }
  // if request.method === 'PUT'

  // if request.method === 'DELETE'

}
