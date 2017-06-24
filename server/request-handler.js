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

// our "nouns" or endpoints are going to our tables in the database:
  // flowers, petals, weeds

exports.handleRequest = function(request, response) {
  // use the parse method of the url core module to get specifically
  // the pathname of the request.url
  var urlPath = url.parse(request.url).pathname;
  // if request.method === 'GET'
  if (request.method === 'GET') {
    // read the file in the file system that matches the url endpoint
    if (urlPath === '/') {
      // utils.sendResponse(response, 'working?', 200);
      console.log(__dirname + '/../client/index.html');
      fs.readFile(__dirname + '/../client/index.html', function(err, data) {
        if (err) {
          // response.writeHead(404, utils.headers);
          // response.end();
          utils.send404(response);
        } else {
          // response.writeHead(200, utils.headers);
          // utils.sendResponse(response, 'Hello', 200);
          utils.sendHTML(response, data, 200);
        }
      });
    }
    else if (urlPath === 'flower') {
      fs.readFile(__dirname + urlPath, function(err, data) {
        if (err) {
          utils.send404(response);
        } else {
          utils.sendResponse(response, data, 200);
        }
      });
    } else {
      // serving assets
      fs.readFile(__dirname + '/../client/' + urlPath, function(err, data) {
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
      utils.collectData(request, function(data) {
        // utils.sendResponse(response, JSON.stringify(data), 200);
        connection.query(`INSERT INTO flowers (name, color, region) VALUES('${data.name}', '${data.color}', '${data.region}')`, function(err, results, fields) {
          if (err) {
            console.error(err);
            utils.send404(response);
          } else {
            utils.sendResponse(response, 'Flower saved to database', 200);
          }
        });
      });
      // console.log('request.body:', request.body);
      // utils.sendResponse(response, 'POST successful', 200);

    } else if (urlPath === '/petal') {
      utils.collectData(request, function(data) {
        connection.query(`INSERT INTO petals (number_of_petals, texture) VALUES('${data.number_of_petals}', '${data.texture}')`, function(err, results, fields) {
          if (err) {
            console.error(err);
            utils.send404(response);
          } else {
            utils.sendResponse(response, 'Petal saved to database', 200);
          }
        });
      });
    } else if (urlPath === '/weed') {
      // else if urlPath is '/weed'
      // concatenate the data sent by the client and add to database
      // insert data from client to database using the mysql connection.query function
      utils.collectData(request, function(data) {
        connection.query(`INSERT INTO weeds (name, color, region) VALUES('${data.name}', '${data.color}', '${data.region}')`, function(err, results, fields) {
          if (err) {
            console.error(err);
            utils.send404(response);
          } else {
            utils.sendResponse(response, 'Weed saved to database', 200);
          }
        });
      });
    }
  }
  // if request.method === 'PUT'
  if (request.method === 'PUT') {
    // PUT requests create or update the database
    // idempotent – the same PUT request should return the same response

    // update flower when urlPath === '/flower'
    if (urlPath === '/flower') {
      // send "This is a flower"
      utils.collectData(request, function(data) {
        // utils.sendResponse(response, JSON.stringify(data), 200);
        connection.query(`UPDATE flowers SET name = '${data.name}', color = '${data.color}', region = '${data.region}' WHERE id = '${data.id}'`, function(err, results, fields) {
          if (err) {
            console.error(err);
            utils.send404(response);
          } else {
            utils.sendResponse(response, 'Flower updated in database', 200);
          }
        });
      });
      // console.log('request.body:', request.body);
      // utils.sendResponse(response, 'POST successful', 200);

    } else if (urlPath === '/petal') {
      utils.collectData(request, function(data) {
        connection.query(`UPDATE petals SET number_of_petals = '${data.number_of_petals}', texture = '${data.texture}' WHERE id = '${data.id}'`, function(err, results, fields) {
          if (err) {
            console.error(err);
            utils.send404(response);
          } else {
            utils.sendResponse(response, 'Petal updated in database', 200);
          }
        });
      });
    } else if (urlPath === '/weed') {
      // else if urlPath is '/weed'
      // concatenate the data sent by the client and add to database
      // insert data from client to database using the mysql connection.query function
      utils.collectData(request, function(data) {
        connection.query(`UPDATE weeds SET name ='${data.name}', color = '${data.color}', region = '${data.region}' WHERE id = '${data.id}'`, function(err, results, fields) {
          if (err) {
            console.error(err);
            utils.send404(response);
          } else {
            utils.sendResponse(response, 'Weed updated in database', 200);
          }
        });
      });
    }
  }
  // if request.method === 'DELETE'
  if (request.method === 'DELETE') {
    // use mysql connection.query to delete row from table

    // insert into flower when urlPath === '/flower'
    if (urlPath === '/flower') {
      // send "This is a flower"
      utils.collectData(request, function(data) {
        connection.query(`DELETE FROM flowers WHERE id = '${data.id}'`, function(err, results, fields) {
          if (err) {
            console.error(err);
            utils.send404(response);
          } else {
            utils.sendResponse(response, 'Flower deleted from database', 200);
          }
        });
      });

    } else if (urlPath === '/petal') {
      utils.collectData(request, function(data) {
        connection.query(`DELETE FROM petals WHERE id = '${data.id}'`, function(err, results, fields) {
          if (err) {
            console.error(err);
            utils.send404(response);
          } else {
            utils.sendResponse(response, 'Petal deleted from database', 200);
          }
        });
      });
    } else if (urlPath === '/weed') {
      // else if urlPath is '/weed'
      // concatenate the data sent by the client and add to database
      // insert data from client to database using the mysql connection.query function
      utils.collectData(request, function(data) {
        connection.query(`DELETE FROM weeds WHERE id = '${data.id}'`, function(err, results, fields) {
          if (err) {
            console.error(err);
            utils.send404(response);
          } else {
            utils.sendResponse(response, 'Weed deleted from database', 200);
          }
        });
      });
    }
  }
}
