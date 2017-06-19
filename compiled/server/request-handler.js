'use strict';

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

exports.handleRequest = function (request, response) {
  // use the parse method of the url core module to get specifically
  // the pathname of the request.url
  var urlPath = url.parse(request.url).pathname;
  // if request.method === 'GET'
  if (request.method === 'GET') {
    // read the file in the file system that matches the url endpoint
    if (urlPath === '/') {
      // utils.sendResponse(response, 'working?', 200);
      console.log(__dirname + '/../client/index.html');
      fs.readFile(__dirname + '/../client/index.html', function (err, data) {
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
    } else if (urlPath === 'flower') {
      fs.readFile(__dirname + urlPath, function (err, data) {
        if (err) {
          utils.send404(response);
        } else {
          utils.sendResponse(response, data, 200);
        }
      });
    } else {
      fs.readFile(__dirname + urlPath, function (err, data) {
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
      utils.collectData(request, function (data) {
        // utils.sendResponse(response, JSON.stringify(data), 200);
        connection.query('INSERT INTO flowers (name, color, region) VALUES(\'' + data.name + '\', \'' + data.color + '\', \'' + data.region + '\')', function (err, results, fields) {
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
      utils.collectData(request, function (data) {
        connection.query('INSERT INTO petals (number_of_petals, texture) VALUES(\'' + data.number_of_petals + '\', \'' + data.texture + '\')', function (err, results, fields) {
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
      utils.collectData(request, function (data) {
        connection.query('INSERT INTO weeds (name, color, region) VALUES(\'' + data.name + '\', \'' + data.color + '\', \'' + data.region + '\')', function (err, results, fields) {
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
      utils.collectData(request, function (data) {
        // utils.sendResponse(response, JSON.stringify(data), 200);
        connection.query('UPDATE flowers SET name = \'' + data.name + '\', color = \'' + data.color + '\', region = \'' + data.region + '\' WHERE id = \'' + data.id + '\'', function (err, results, fields) {
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
      utils.collectData(request, function (data) {
        connection.query('UPDATE petals SET number_of_petals = \'' + data.number_of_petals + '\', texture = \'' + data.texture + '\' WHERE id = \'' + data.id + '\'', function (err, results, fields) {
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
      utils.collectData(request, function (data) {
        connection.query('UPDATE weeds SET name =\'' + data.name + '\', color = \'' + data.color + '\', region = \'' + data.region + '\' WHERE id = \'' + data.id + '\'', function (err, results, fields) {
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
      utils.collectData(request, function (data) {
        connection.query('DELETE FROM flowers WHERE id = \'' + data.id + '\'', function (err, results, fields) {
          if (err) {
            console.error(err);
            utils.send404(response);
          } else {
            utils.sendResponse(response, 'Flower deleted from database', 200);
          }
        });
      });
    } else if (urlPath === '/petal') {
      utils.collectData(request, function (data) {
        connection.query('DELETE FROM petals WHERE id = \'' + data.id + '\'', function (err, results, fields) {
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
      utils.collectData(request, function (data) {
        connection.query('DELETE FROM weeds WHERE id = \'' + data.id + '\'', function (err, results, fields) {
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
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9yZXF1ZXN0LWhhbmRsZXIuanMiXSwibmFtZXMiOlsidXRpbHMiLCJyZXF1aXJlIiwidXJsIiwiZnMiLCJteXNxbCIsImNvbm5lY3Rpb24iLCJjcmVhdGVDb25uZWN0aW9uIiwiaG9zdCIsInVzZXIiLCJwYXNzd29yZCIsImRhdGFiYXNlIiwiZXhwb3J0cyIsImhhbmRsZVJlcXVlc3QiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJ1cmxQYXRoIiwicGFyc2UiLCJwYXRobmFtZSIsIm1ldGhvZCIsImNvbnNvbGUiLCJsb2ciLCJfX2Rpcm5hbWUiLCJyZWFkRmlsZSIsImVyciIsImRhdGEiLCJzZW5kNDA0Iiwic2VuZEhUTUwiLCJzZW5kUmVzcG9uc2UiLCJjb2xsZWN0RGF0YSIsInF1ZXJ5IiwibmFtZSIsImNvbG9yIiwicmVnaW9uIiwicmVzdWx0cyIsImZpZWxkcyIsImVycm9yIiwibnVtYmVyX29mX3BldGFscyIsInRleHR1cmUiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxRQUFRQyxRQUFRLFNBQVIsQ0FBWjtBQUNBLElBQUlDLE1BQU1ELFFBQVEsS0FBUixDQUFWO0FBQ0EsSUFBSUUsS0FBS0YsUUFBUSxJQUFSLENBQVQ7O0FBRUEsSUFBSUcsUUFBUUgsUUFBUSxPQUFSLENBQVo7O0FBRUEsSUFBSUksYUFBYUQsTUFBTUUsZ0JBQU4sQ0FBdUI7QUFDdENDLFFBQU0sV0FEZ0M7QUFFdENDLFFBQU0sTUFGZ0M7QUFHdENDLFlBQVUsRUFINEI7QUFJdENDLFlBQVU7QUFKNEIsQ0FBdkIsQ0FBakI7O0FBT0E7QUFDRTs7QUFFRkMsUUFBUUMsYUFBUixHQUF3QixVQUFTQyxPQUFULEVBQWtCQyxRQUFsQixFQUE0QjtBQUNsRDtBQUNBO0FBQ0EsTUFBSUMsVUFBVWIsSUFBSWMsS0FBSixDQUFVSCxRQUFRWCxHQUFsQixFQUF1QmUsUUFBckM7QUFDQTtBQUNBLE1BQUlKLFFBQVFLLE1BQVIsS0FBbUIsS0FBdkIsRUFBOEI7QUFD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QixFQUEyRCxHQUEzRDtBQUNEO0FBQ0YsU0FQRDtBQVFELE9BVEQ7QUFVRDtBQUNGO0FBQ0YsQ0F0TEQiLCJmaWxlIjoicmVxdWVzdC1oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIHVybCA9IHJlcXVpcmUoJ3VybCcpO1xudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcblxudmFyIG15c3FsID0gcmVxdWlyZSgnbXlzcWwnKTtcblxudmFyIGNvbm5lY3Rpb24gPSBteXNxbC5jcmVhdGVDb25uZWN0aW9uKHtcbiAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gIHVzZXI6ICdyb290JyxcbiAgcGFzc3dvcmQ6ICcnLFxuICBkYXRhYmFzZTogJ2dhcmRlbidcbn0pO1xuXG4vLyBvdXIgXCJub3Vuc1wiIG9yIGVuZHBvaW50cyBhcmUgZ29pbmcgdG8gb3VyIHRhYmxlcyBpbiB0aGUgZGF0YWJhc2U6XG4gIC8vIGZsb3dlcnMsIHBldGFscywgd2VlZHNcblxuZXhwb3J0cy5oYW5kbGVSZXF1ZXN0ID0gZnVuY3Rpb24ocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgLy8gdXNlIHRoZSBwYXJzZSBtZXRob2Qgb2YgdGhlIHVybCBjb3JlIG1vZHVsZSB0byBnZXQgc3BlY2lmaWNhbGx5XG4gIC8vIHRoZSBwYXRobmFtZSBvZiB0aGUgcmVxdWVzdC51cmxcbiAgdmFyIHVybFBhdGggPSB1cmwucGFyc2UocmVxdWVzdC51cmwpLnBhdGhuYW1lO1xuICAvLyBpZiByZXF1ZXN0Lm1ldGhvZCA9PT0gJ0dFVCdcbiAgaWYgKHJlcXVlc3QubWV0aG9kID09PSAnR0VUJykge1xuICAgIC8vIHJlYWQgdGhlIGZpbGUgaW4gdGhlIGZpbGUgc3lzdGVtIHRoYXQgbWF0Y2hlcyB0aGUgdXJsIGVuZHBvaW50XG4gICAgaWYgKHVybFBhdGggPT09ICcvJykge1xuICAgICAgLy8gdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCAnd29ya2luZz8nLCAyMDApO1xuICAgICAgY29uc29sZS5sb2coX19kaXJuYW1lICsgJy8uLi9jbGllbnQvaW5kZXguaHRtbCcpO1xuICAgICAgZnMucmVhZEZpbGUoX19kaXJuYW1lICsgJy8uLi9jbGllbnQvaW5kZXguaHRtbCcsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgLy8gcmVzcG9uc2Uud3JpdGVIZWFkKDQwNCwgdXRpbHMuaGVhZGVycyk7XG4gICAgICAgICAgLy8gcmVzcG9uc2UuZW5kKCk7XG4gICAgICAgICAgdXRpbHMuc2VuZDQwNChyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVzcG9uc2Uud3JpdGVIZWFkKDIwMCwgdXRpbHMuaGVhZGVycyk7XG4gICAgICAgICAgLy8gdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCAnSGVsbG8nLCAyMDApO1xuICAgICAgICAgIHV0aWxzLnNlbmRIVE1MKHJlc3BvbnNlLCBkYXRhLCAyMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodXJsUGF0aCA9PT0gJ2Zsb3dlcicpIHtcbiAgICAgIGZzLnJlYWRGaWxlKF9fZGlybmFtZSArIHVybFBhdGgsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgdXRpbHMuc2VuZDQwNChyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCBkYXRhLCAyMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnMucmVhZEZpbGUoX19kaXJuYW1lICsgdXJsUGF0aCwgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICB1dGlscy5zZW5kNDA0KHJlc3BvbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1dGlscy5zZW5kUmVzcG9uc2UocmVzcG9uc2UsIGRhdGEsIDIwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHJlcXVlc3QubWV0aG9kID09PSAnUE9TVCdcbiAgaWYgKHJlcXVlc3QubWV0aG9kID09PSAnUE9TVCcpIHtcblxuICAgIC8vIGluc2VydCBpbnRvIGZsb3dlciB3aGVuIHVybFBhdGggPT09ICcvZmxvd2VyJ1xuICAgIGlmICh1cmxQYXRoID09PSAnL2Zsb3dlcicpIHtcbiAgICAgIC8vIHNlbmQgXCJUaGlzIGlzIGEgZmxvd2VyXCJcbiAgICAgIHV0aWxzLmNvbGxlY3REYXRhKHJlcXVlc3QsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy8gdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgMjAwKTtcbiAgICAgICAgY29ubmVjdGlvbi5xdWVyeShgSU5TRVJUIElOVE8gZmxvd2VycyAobmFtZSwgY29sb3IsIHJlZ2lvbikgVkFMVUVTKCcke2RhdGEubmFtZX0nLCAnJHtkYXRhLmNvbG9yfScsICcke2RhdGEucmVnaW9ufScpYCwgZnVuY3Rpb24oZXJyLCByZXN1bHRzLCBmaWVsZHMpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB1dGlscy5zZW5kNDA0KHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCAnRmxvd2VyIHNhdmVkIHRvIGRhdGFiYXNlJywgMjAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygncmVxdWVzdC5ib2R5OicsIHJlcXVlc3QuYm9keSk7XG4gICAgICAvLyB1dGlscy5zZW5kUmVzcG9uc2UocmVzcG9uc2UsICdQT1NUIHN1Y2Nlc3NmdWwnLCAyMDApO1xuXG4gICAgfSBlbHNlIGlmICh1cmxQYXRoID09PSAnL3BldGFsJykge1xuICAgICAgdXRpbHMuY29sbGVjdERhdGEocmVxdWVzdCwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KGBJTlNFUlQgSU5UTyBwZXRhbHMgKG51bWJlcl9vZl9wZXRhbHMsIHRleHR1cmUpIFZBTFVFUygnJHtkYXRhLm51bWJlcl9vZl9wZXRhbHN9JywgJyR7ZGF0YS50ZXh0dXJlfScpYCwgZnVuY3Rpb24oZXJyLCByZXN1bHRzLCBmaWVsZHMpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB1dGlscy5zZW5kNDA0KHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCAnUGV0YWwgc2F2ZWQgdG8gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHVybFBhdGggPT09ICcvd2VlZCcpIHtcbiAgICAgIC8vIGVsc2UgaWYgdXJsUGF0aCBpcyAnL3dlZWQnXG4gICAgICAvLyBjb25jYXRlbmF0ZSB0aGUgZGF0YSBzZW50IGJ5IHRoZSBjbGllbnQgYW5kIGFkZCB0byBkYXRhYmFzZVxuICAgICAgLy8gaW5zZXJ0IGRhdGEgZnJvbSBjbGllbnQgdG8gZGF0YWJhc2UgdXNpbmcgdGhlIG15c3FsIGNvbm5lY3Rpb24ucXVlcnkgZnVuY3Rpb25cbiAgICAgIHV0aWxzLmNvbGxlY3REYXRhKHJlcXVlc3QsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29ubmVjdGlvbi5xdWVyeShgSU5TRVJUIElOVE8gd2VlZHMgKG5hbWUsIGNvbG9yLCByZWdpb24pIFZBTFVFUygnJHtkYXRhLm5hbWV9JywgJyR7ZGF0YS5jb2xvcn0nLCAnJHtkYXRhLnJlZ2lvbn0nKWAsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cywgZmllbGRzKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdXRpbHMuc2VuZDQwNChyZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLnNlbmRSZXNwb25zZShyZXNwb25zZSwgJ1dlZWQgc2F2ZWQgdG8gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLy8gaWYgcmVxdWVzdC5tZXRob2QgPT09ICdQVVQnXG4gIGlmIChyZXF1ZXN0Lm1ldGhvZCA9PT0gJ1BVVCcpIHtcbiAgICAvLyBQVVQgcmVxdWVzdHMgY3JlYXRlIG9yIHVwZGF0ZSB0aGUgZGF0YWJhc2VcbiAgICAvLyBpZGVtcG90ZW50IOKAkyB0aGUgc2FtZSBQVVQgcmVxdWVzdCBzaG91bGQgcmV0dXJuIHRoZSBzYW1lIHJlc3BvbnNlXG5cbiAgICAvLyB1cGRhdGUgZmxvd2VyIHdoZW4gdXJsUGF0aCA9PT0gJy9mbG93ZXInXG4gICAgaWYgKHVybFBhdGggPT09ICcvZmxvd2VyJykge1xuICAgICAgLy8gc2VuZCBcIlRoaXMgaXMgYSBmbG93ZXJcIlxuICAgICAgdXRpbHMuY29sbGVjdERhdGEocmVxdWVzdCwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAvLyB1dGlscy5zZW5kUmVzcG9uc2UocmVzcG9uc2UsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCAyMDApO1xuICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KGBVUERBVEUgZmxvd2VycyBTRVQgbmFtZSA9ICcke2RhdGEubmFtZX0nLCBjb2xvciA9ICcke2RhdGEuY29sb3J9JywgcmVnaW9uID0gJyR7ZGF0YS5yZWdpb259JyBXSEVSRSBpZCA9ICcke2RhdGEuaWR9J2AsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cywgZmllbGRzKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdXRpbHMuc2VuZDQwNChyZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLnNlbmRSZXNwb25zZShyZXNwb25zZSwgJ0Zsb3dlciB1cGRhdGVkIGluIGRhdGFiYXNlJywgMjAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygncmVxdWVzdC5ib2R5OicsIHJlcXVlc3QuYm9keSk7XG4gICAgICAvLyB1dGlscy5zZW5kUmVzcG9uc2UocmVzcG9uc2UsICdQT1NUIHN1Y2Nlc3NmdWwnLCAyMDApO1xuXG4gICAgfSBlbHNlIGlmICh1cmxQYXRoID09PSAnL3BldGFsJykge1xuICAgICAgdXRpbHMuY29sbGVjdERhdGEocmVxdWVzdCwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KGBVUERBVEUgcGV0YWxzIFNFVCBudW1iZXJfb2ZfcGV0YWxzID0gJyR7ZGF0YS5udW1iZXJfb2ZfcGV0YWxzfScsIHRleHR1cmUgPSAnJHtkYXRhLnRleHR1cmV9JyBXSEVSRSBpZCA9ICcke2RhdGEuaWR9J2AsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cywgZmllbGRzKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdXRpbHMuc2VuZDQwNChyZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLnNlbmRSZXNwb25zZShyZXNwb25zZSwgJ1BldGFsIHVwZGF0ZWQgaW4gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHVybFBhdGggPT09ICcvd2VlZCcpIHtcbiAgICAgIC8vIGVsc2UgaWYgdXJsUGF0aCBpcyAnL3dlZWQnXG4gICAgICAvLyBjb25jYXRlbmF0ZSB0aGUgZGF0YSBzZW50IGJ5IHRoZSBjbGllbnQgYW5kIGFkZCB0byBkYXRhYmFzZVxuICAgICAgLy8gaW5zZXJ0IGRhdGEgZnJvbSBjbGllbnQgdG8gZGF0YWJhc2UgdXNpbmcgdGhlIG15c3FsIGNvbm5lY3Rpb24ucXVlcnkgZnVuY3Rpb25cbiAgICAgIHV0aWxzLmNvbGxlY3REYXRhKHJlcXVlc3QsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29ubmVjdGlvbi5xdWVyeShgVVBEQVRFIHdlZWRzIFNFVCBuYW1lID0nJHtkYXRhLm5hbWV9JywgY29sb3IgPSAnJHtkYXRhLmNvbG9yfScsIHJlZ2lvbiA9ICcke2RhdGEucmVnaW9ufScgV0hFUkUgaWQgPSAnJHtkYXRhLmlkfSdgLCBmdW5jdGlvbihlcnIsIHJlc3VsdHMsIGZpZWxkcykge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHV0aWxzLnNlbmQ0MDQocmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1dGlscy5zZW5kUmVzcG9uc2UocmVzcG9uc2UsICdXZWVkIHVwZGF0ZWQgaW4gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLy8gaWYgcmVxdWVzdC5tZXRob2QgPT09ICdERUxFVEUnXG4gIGlmIChyZXF1ZXN0Lm1ldGhvZCA9PT0gJ0RFTEVURScpIHtcbiAgICAvLyB1c2UgbXlzcWwgY29ubmVjdGlvbi5xdWVyeSB0byBkZWxldGUgcm93IGZyb20gdGFibGVcblxuICAgIC8vIGluc2VydCBpbnRvIGZsb3dlciB3aGVuIHVybFBhdGggPT09ICcvZmxvd2VyJ1xuICAgIGlmICh1cmxQYXRoID09PSAnL2Zsb3dlcicpIHtcbiAgICAgIC8vIHNlbmQgXCJUaGlzIGlzIGEgZmxvd2VyXCJcbiAgICAgIHV0aWxzLmNvbGxlY3REYXRhKHJlcXVlc3QsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29ubmVjdGlvbi5xdWVyeShgREVMRVRFIEZST00gZmxvd2VycyBXSEVSRSBpZCA9ICcke2RhdGEuaWR9J2AsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cywgZmllbGRzKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdXRpbHMuc2VuZDQwNChyZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLnNlbmRSZXNwb25zZShyZXNwb25zZSwgJ0Zsb3dlciBkZWxldGVkIGZyb20gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSBpZiAodXJsUGF0aCA9PT0gJy9wZXRhbCcpIHtcbiAgICAgIHV0aWxzLmNvbGxlY3REYXRhKHJlcXVlc3QsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29ubmVjdGlvbi5xdWVyeShgREVMRVRFIEZST00gcGV0YWxzIFdIRVJFIGlkID0gJyR7ZGF0YS5pZH0nYCwgZnVuY3Rpb24oZXJyLCByZXN1bHRzLCBmaWVsZHMpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB1dGlscy5zZW5kNDA0KHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCAnUGV0YWwgZGVsZXRlZCBmcm9tIGRhdGFiYXNlJywgMjAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh1cmxQYXRoID09PSAnL3dlZWQnKSB7XG4gICAgICAvLyBlbHNlIGlmIHVybFBhdGggaXMgJy93ZWVkJ1xuICAgICAgLy8gY29uY2F0ZW5hdGUgdGhlIGRhdGEgc2VudCBieSB0aGUgY2xpZW50IGFuZCBhZGQgdG8gZGF0YWJhc2VcbiAgICAgIC8vIGluc2VydCBkYXRhIGZyb20gY2xpZW50IHRvIGRhdGFiYXNlIHVzaW5nIHRoZSBteXNxbCBjb25uZWN0aW9uLnF1ZXJ5IGZ1bmN0aW9uXG4gICAgICB1dGlscy5jb2xsZWN0RGF0YShyZXF1ZXN0LCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbm5lY3Rpb24ucXVlcnkoYERFTEVURSBGUk9NIHdlZWRzIFdIRVJFIGlkID0gJyR7ZGF0YS5pZH0nYCwgZnVuY3Rpb24oZXJyLCByZXN1bHRzLCBmaWVsZHMpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB1dGlscy5zZW5kNDA0KHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCAnV2VlZCBkZWxldGVkIGZyb20gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==