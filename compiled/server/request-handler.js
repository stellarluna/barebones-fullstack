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
      console.log('render /');
      // utils.sendResponse(response, 'working?', 200);
      var indexPage = urlPath + 'client/index.html';
      console.log(__dirname + indexPage);
      fs.readFile(__dirname + indexPage, function (err, data) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9yZXF1ZXN0LWhhbmRsZXIuanMiXSwibmFtZXMiOlsidXRpbHMiLCJyZXF1aXJlIiwidXJsIiwiZnMiLCJteXNxbCIsImNvbm5lY3Rpb24iLCJjcmVhdGVDb25uZWN0aW9uIiwiaG9zdCIsInVzZXIiLCJwYXNzd29yZCIsImRhdGFiYXNlIiwiZXhwb3J0cyIsImhhbmRsZVJlcXVlc3QiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJ1cmxQYXRoIiwicGFyc2UiLCJwYXRobmFtZSIsIm1ldGhvZCIsImNvbnNvbGUiLCJsb2ciLCJpbmRleFBhZ2UiLCJfX2Rpcm5hbWUiLCJyZWFkRmlsZSIsImVyciIsImRhdGEiLCJzZW5kNDA0Iiwic2VuZFJlc3BvbnNlIiwiY29sbGVjdERhdGEiLCJxdWVyeSIsIm5hbWUiLCJjb2xvciIsInJlZ2lvbiIsInJlc3VsdHMiLCJmaWVsZHMiLCJlcnJvciIsIm51bWJlcl9vZl9wZXRhbHMiLCJ0ZXh0dXJlIiwiaWQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsUUFBUUMsUUFBUSxTQUFSLENBQVo7QUFDQSxJQUFJQyxNQUFNRCxRQUFRLEtBQVIsQ0FBVjtBQUNBLElBQUlFLEtBQUtGLFFBQVEsSUFBUixDQUFUOztBQUVBLElBQUlHLFFBQVFILFFBQVEsT0FBUixDQUFaOztBQUVBLElBQUlJLGFBQWFELE1BQU1FLGdCQUFOLENBQXVCO0FBQ3RDQyxRQUFNLFdBRGdDO0FBRXRDQyxRQUFNLE1BRmdDO0FBR3RDQyxZQUFVLEVBSDRCO0FBSXRDQyxZQUFVO0FBSjRCLENBQXZCLENBQWpCOztBQU9BO0FBQ0U7O0FBRUZDLFFBQVFDLGFBQVIsR0FBd0IsVUFBU0MsT0FBVCxFQUFrQkMsUUFBbEIsRUFBNEI7QUFDbEQ7QUFDQTtBQUNBLE1BQUlDLFVBQVViLElBQUljLEtBQUosQ0FBVUgsUUFBUVgsR0FBbEIsRUFBdUJlLFFBQXJDO0FBQ0E7QUFDQSxNQUFJSixRQUFRSyxNQUFSLEtBQW1CLEtBQXZCLEVBQThCO0FB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O0FBQ0Q7QUFDRixTQVBEO0FBUUQsT0FURDtBQVdELEtBYkQsTUFhTyxJQUFJQyxZQUFZLFFBQWhCLEVBQTBCO0FBQy9CZixZQUFNNEIsV0FBTixDQUFrQmYsT0FBbEIsRUFBMkIsVUFBU1ksSUFBVCxFQUFlO0FBQ3hDcEIsbUJBQVd3QixLQUFYLHNDQUFtREosS0FBS2EsRUFBeEQsU0FBK0QsVUFBU2QsR0FBVCxFQUFjUyxPQUFkLEVBQXVCQyxNQUF2QixFQUErQjtBQUM1RixjQUFJVixHQUFKLEVBQVM7QUFDUEwsb0JBQVFnQixLQUFSLENBQWNYLEdBQWQ7QUFDQXhCLGtCQUFNMEIsT0FBTixDQUFjWixRQUFkO0FBQ0QsV0FIRCxNQUdPO0FBQ0xkLGtCQUFNMkIsWUFBTixDQUFtQmIsUUFBbkIsRUFBNkIsNkJBQTdCLEVBQTRELEdBQTVEO0FBQ0Q7QUFDRixTQVBEO0FBUUQsT0FURDtBQVVELEtBWE0sTUFXQSxJQUFJQyxZQUFZLE9BQWhCLEVBQXlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBZixZQUFNNEIsV0FBTixDQUFrQmYsT0FBbEIsRUFBMkIsVUFBU1ksSUFBVCxFQUFlO0FBQ3hDcEIsbUJBQVd3QixLQUFYLHFDQUFrREosS0FBS2EsRUFBdkQsU0FBOEQsVUFBU2QsR0FBVCxFQUFjUyxPQUFkLEVBQXVCQyxNQUF2QixFQUErQjtBQUMzRixjQUFJVixHQUFKLEVBQVM7QUFDUEwsb0JBQVFnQixLQUFSLENBQWNYLEdBQWQ7QUFDQXhCLGtCQUFNMEIsT0FBTixDQUFjWixRQUFkO0FBQ0QsV0FIRCxNQUdPO0FBQ0xkLGtCQUFNMkIsWUFBTixDQUFtQmIsUUFBbkIsRUFBNkIsNEJBQTdCLEVBQTJELEdBQTNEO0FBQ0Q7QUFDRixTQVBEO0FBUUQsT0FURDtBQVVEO0FBQ0Y7QUFDRixDQTlLRCIsImZpbGUiOiJyZXF1ZXN0LWhhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG52YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuXG52YXIgbXlzcWwgPSByZXF1aXJlKCdteXNxbCcpO1xuXG52YXIgY29ubmVjdGlvbiA9IG15c3FsLmNyZWF0ZUNvbm5lY3Rpb24oe1xuICBob3N0OiAnbG9jYWxob3N0JyxcbiAgdXNlcjogJ3Jvb3QnLFxuICBwYXNzd29yZDogJycsXG4gIGRhdGFiYXNlOiAnZ2FyZGVuJ1xufSk7XG5cbi8vIG91ciBcIm5vdW5zXCIgb3IgZW5kcG9pbnRzIGFyZSBnb2luZyB0byBvdXIgdGFibGVzIGluIHRoZSBkYXRhYmFzZTpcbiAgLy8gZmxvd2VycywgcGV0YWxzLCB3ZWVkc1xuXG5leHBvcnRzLmhhbmRsZVJlcXVlc3QgPSBmdW5jdGlvbihyZXF1ZXN0LCByZXNwb25zZSkge1xuICAvLyB1c2UgdGhlIHBhcnNlIG1ldGhvZCBvZiB0aGUgdXJsIGNvcmUgbW9kdWxlIHRvIGdldCBzcGVjaWZpY2FsbHlcbiAgLy8gdGhlIHBhdGhuYW1lIG9mIHRoZSByZXF1ZXN0LnVybFxuICB2YXIgdXJsUGF0aCA9IHVybC5wYXJzZShyZXF1ZXN0LnVybCkucGF0aG5hbWU7XG4gIC8vIGlmIHJlcXVlc3QubWV0aG9kID09PSAnR0VUJ1xuICBpZiAocmVxdWVzdC5tZXRob2QgPT09ICdHRVQnKSB7XG4gICAgLy8gcmVhZCB0aGUgZmlsZSBpbiB0aGUgZmlsZSBzeXN0ZW0gdGhhdCBtYXRjaGVzIHRoZSB1cmwgZW5kcG9pbnRcbiAgICBpZiAodXJsUGF0aCA9PT0gJy8nKSB7XG4gICAgICBjb25zb2xlLmxvZygncmVuZGVyIC8nKTtcbiAgICAgIC8vIHV0aWxzLnNlbmRSZXNwb25zZShyZXNwb25zZSwgJ3dvcmtpbmc/JywgMjAwKTtcbiAgICAgIHZhciBpbmRleFBhZ2UgPSB1cmxQYXRoICsgJ2NsaWVudC9pbmRleC5odG1sJztcbiAgICAgIGNvbnNvbGUubG9nKF9fZGlybmFtZSArIGluZGV4UGFnZSk7XG4gICAgICBmcy5yZWFkRmlsZShfX2Rpcm5hbWUgKyBpbmRleFBhZ2UsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgLy8gcmVzcG9uc2Uud3JpdGVIZWFkKDQwNCwgdXRpbHMuaGVhZGVycyk7XG4gICAgICAgICAgLy8gcmVzcG9uc2UuZW5kKCk7XG4gICAgICAgICAgdXRpbHMuc2VuZDQwNChyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVzcG9uc2Uud3JpdGVIZWFkKDIwMCwgdXRpbHMuaGVhZGVycyk7XG4gICAgICAgICAgdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCBkYXRhLCAyMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHVybFBhdGggPT09ICdmbG93ZXInKSB7XG4gICAgICBmcy5yZWFkRmlsZShfX2Rpcm5hbWUgKyB1cmxQYXRoLCBmdW5jdGlvbihlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHV0aWxzLnNlbmQ0MDQocmVzcG9uc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHV0aWxzLnNlbmRSZXNwb25zZShyZXNwb25zZSwgZGF0YSwgMjAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIC8vIGlmIHJlcXVlc3QubWV0aG9kID09PSAnUE9TVCdcbiAgaWYgKHJlcXVlc3QubWV0aG9kID09PSAnUE9TVCcpIHtcblxuICAgIC8vIGluc2VydCBpbnRvIGZsb3dlciB3aGVuIHVybFBhdGggPT09ICcvZmxvd2VyJ1xuICAgIGlmICh1cmxQYXRoID09PSAnL2Zsb3dlcicpIHtcbiAgICAgIC8vIHNlbmQgXCJUaGlzIGlzIGEgZmxvd2VyXCJcbiAgICAgIHV0aWxzLmNvbGxlY3REYXRhKHJlcXVlc3QsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy8gdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgMjAwKTtcbiAgICAgICAgY29ubmVjdGlvbi5xdWVyeShgSU5TRVJUIElOVE8gZmxvd2VycyAobmFtZSwgY29sb3IsIHJlZ2lvbikgVkFMVUVTKCcke2RhdGEubmFtZX0nLCAnJHtkYXRhLmNvbG9yfScsICcke2RhdGEucmVnaW9ufScpYCwgZnVuY3Rpb24oZXJyLCByZXN1bHRzLCBmaWVsZHMpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB1dGlscy5zZW5kNDA0KHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCAnRmxvd2VyIHNhdmVkIHRvIGRhdGFiYXNlJywgMjAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygncmVxdWVzdC5ib2R5OicsIHJlcXVlc3QuYm9keSk7XG4gICAgICAvLyB1dGlscy5zZW5kUmVzcG9uc2UocmVzcG9uc2UsICdQT1NUIHN1Y2Nlc3NmdWwnLCAyMDApO1xuXG4gICAgfSBlbHNlIGlmICh1cmxQYXRoID09PSAnL3BldGFsJykge1xuICAgICAgdXRpbHMuY29sbGVjdERhdGEocmVxdWVzdCwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KGBJTlNFUlQgSU5UTyBwZXRhbHMgKG51bWJlcl9vZl9wZXRhbHMsIHRleHR1cmUpIFZBTFVFUygnJHtkYXRhLm51bWJlcl9vZl9wZXRhbHN9JywgJyR7ZGF0YS50ZXh0dXJlfScpYCwgZnVuY3Rpb24oZXJyLCByZXN1bHRzLCBmaWVsZHMpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB1dGlscy5zZW5kNDA0KHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCAnUGV0YWwgc2F2ZWQgdG8gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHVybFBhdGggPT09ICcvd2VlZCcpIHtcbiAgICAgIC8vIGVsc2UgaWYgdXJsUGF0aCBpcyAnL3dlZWQnXG4gICAgICAvLyBjb25jYXRlbmF0ZSB0aGUgZGF0YSBzZW50IGJ5IHRoZSBjbGllbnQgYW5kIGFkZCB0byBkYXRhYmFzZVxuICAgICAgLy8gaW5zZXJ0IGRhdGEgZnJvbSBjbGllbnQgdG8gZGF0YWJhc2UgdXNpbmcgdGhlIG15c3FsIGNvbm5lY3Rpb24ucXVlcnkgZnVuY3Rpb25cbiAgICAgIHV0aWxzLmNvbGxlY3REYXRhKHJlcXVlc3QsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29ubmVjdGlvbi5xdWVyeShgSU5TRVJUIElOVE8gd2VlZHMgKG5hbWUsIGNvbG9yLCByZWdpb24pIFZBTFVFUygnJHtkYXRhLm5hbWV9JywgJyR7ZGF0YS5jb2xvcn0nLCAnJHtkYXRhLnJlZ2lvbn0nKWAsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cywgZmllbGRzKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdXRpbHMuc2VuZDQwNChyZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLnNlbmRSZXNwb25zZShyZXNwb25zZSwgJ1dlZWQgc2F2ZWQgdG8gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLy8gaWYgcmVxdWVzdC5tZXRob2QgPT09ICdQVVQnXG4gIGlmIChyZXF1ZXN0Lm1ldGhvZCA9PT0gJ1BVVCcpIHtcbiAgICAvLyBQVVQgcmVxdWVzdHMgY3JlYXRlIG9yIHVwZGF0ZSB0aGUgZGF0YWJhc2VcbiAgICAvLyBpZGVtcG90ZW50IOKAkyB0aGUgc2FtZSBQVVQgcmVxdWVzdCBzaG91bGQgcmV0dXJuIHRoZSBzYW1lIHJlc3BvbnNlXG5cbiAgICAvLyB1cGRhdGUgZmxvd2VyIHdoZW4gdXJsUGF0aCA9PT0gJy9mbG93ZXInXG4gICAgaWYgKHVybFBhdGggPT09ICcvZmxvd2VyJykge1xuICAgICAgLy8gc2VuZCBcIlRoaXMgaXMgYSBmbG93ZXJcIlxuICAgICAgdXRpbHMuY29sbGVjdERhdGEocmVxdWVzdCwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAvLyB1dGlscy5zZW5kUmVzcG9uc2UocmVzcG9uc2UsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCAyMDApO1xuICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KGBVUERBVEUgZmxvd2VycyBTRVQgbmFtZSA9ICcke2RhdGEubmFtZX0nLCBjb2xvciA9ICcke2RhdGEuY29sb3J9JywgcmVnaW9uID0gJyR7ZGF0YS5yZWdpb259JyBXSEVSRSBpZCA9ICcke2RhdGEuaWR9J2AsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cywgZmllbGRzKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdXRpbHMuc2VuZDQwNChyZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLnNlbmRSZXNwb25zZShyZXNwb25zZSwgJ0Zsb3dlciB1cGRhdGVkIGluIGRhdGFiYXNlJywgMjAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygncmVxdWVzdC5ib2R5OicsIHJlcXVlc3QuYm9keSk7XG4gICAgICAvLyB1dGlscy5zZW5kUmVzcG9uc2UocmVzcG9uc2UsICdQT1NUIHN1Y2Nlc3NmdWwnLCAyMDApO1xuXG4gICAgfSBlbHNlIGlmICh1cmxQYXRoID09PSAnL3BldGFsJykge1xuICAgICAgdXRpbHMuY29sbGVjdERhdGEocmVxdWVzdCwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBjb25uZWN0aW9uLnF1ZXJ5KGBVUERBVEUgcGV0YWxzIFNFVCBudW1iZXJfb2ZfcGV0YWxzID0gJyR7ZGF0YS5udW1iZXJfb2ZfcGV0YWxzfScsIHRleHR1cmUgPSAnJHtkYXRhLnRleHR1cmV9JyBXSEVSRSBpZCA9ICcke2RhdGEuaWR9J2AsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cywgZmllbGRzKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdXRpbHMuc2VuZDQwNChyZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLnNlbmRSZXNwb25zZShyZXNwb25zZSwgJ1BldGFsIHVwZGF0ZWQgaW4gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHVybFBhdGggPT09ICcvd2VlZCcpIHtcbiAgICAgIC8vIGVsc2UgaWYgdXJsUGF0aCBpcyAnL3dlZWQnXG4gICAgICAvLyBjb25jYXRlbmF0ZSB0aGUgZGF0YSBzZW50IGJ5IHRoZSBjbGllbnQgYW5kIGFkZCB0byBkYXRhYmFzZVxuICAgICAgLy8gaW5zZXJ0IGRhdGEgZnJvbSBjbGllbnQgdG8gZGF0YWJhc2UgdXNpbmcgdGhlIG15c3FsIGNvbm5lY3Rpb24ucXVlcnkgZnVuY3Rpb25cbiAgICAgIHV0aWxzLmNvbGxlY3REYXRhKHJlcXVlc3QsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29ubmVjdGlvbi5xdWVyeShgVVBEQVRFIHdlZWRzIFNFVCBuYW1lID0nJHtkYXRhLm5hbWV9JywgY29sb3IgPSAnJHtkYXRhLmNvbG9yfScsIHJlZ2lvbiA9ICcke2RhdGEucmVnaW9ufScgV0hFUkUgaWQgPSAnJHtkYXRhLmlkfSdgLCBmdW5jdGlvbihlcnIsIHJlc3VsdHMsIGZpZWxkcykge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHV0aWxzLnNlbmQ0MDQocmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1dGlscy5zZW5kUmVzcG9uc2UocmVzcG9uc2UsICdXZWVkIHVwZGF0ZWQgaW4gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLy8gaWYgcmVxdWVzdC5tZXRob2QgPT09ICdERUxFVEUnXG4gIGlmIChyZXF1ZXN0Lm1ldGhvZCA9PT0gJ0RFTEVURScpIHtcbiAgICAvLyB1c2UgbXlzcWwgY29ubmVjdGlvbi5xdWVyeSB0byBkZWxldGUgcm93IGZyb20gdGFibGVcblxuICAgIC8vIGluc2VydCBpbnRvIGZsb3dlciB3aGVuIHVybFBhdGggPT09ICcvZmxvd2VyJ1xuICAgIGlmICh1cmxQYXRoID09PSAnL2Zsb3dlcicpIHtcbiAgICAgIC8vIHNlbmQgXCJUaGlzIGlzIGEgZmxvd2VyXCJcbiAgICAgIHV0aWxzLmNvbGxlY3REYXRhKHJlcXVlc3QsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29ubmVjdGlvbi5xdWVyeShgREVMRVRFIEZST00gZmxvd2VycyBXSEVSRSBpZCA9ICcke2RhdGEuaWR9J2AsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cywgZmllbGRzKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdXRpbHMuc2VuZDQwNChyZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLnNlbmRSZXNwb25zZShyZXNwb25zZSwgJ0Zsb3dlciBkZWxldGVkIGZyb20gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSBpZiAodXJsUGF0aCA9PT0gJy9wZXRhbCcpIHtcbiAgICAgIHV0aWxzLmNvbGxlY3REYXRhKHJlcXVlc3QsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29ubmVjdGlvbi5xdWVyeShgREVMRVRFIEZST00gcGV0YWxzIFdIRVJFIGlkID0gJyR7ZGF0YS5pZH0nYCwgZnVuY3Rpb24oZXJyLCByZXN1bHRzLCBmaWVsZHMpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB1dGlscy5zZW5kNDA0KHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCAnUGV0YWwgZGVsZXRlZCBmcm9tIGRhdGFiYXNlJywgMjAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh1cmxQYXRoID09PSAnL3dlZWQnKSB7XG4gICAgICAvLyBlbHNlIGlmIHVybFBhdGggaXMgJy93ZWVkJ1xuICAgICAgLy8gY29uY2F0ZW5hdGUgdGhlIGRhdGEgc2VudCBieSB0aGUgY2xpZW50IGFuZCBhZGQgdG8gZGF0YWJhc2VcbiAgICAgIC8vIGluc2VydCBkYXRhIGZyb20gY2xpZW50IHRvIGRhdGFiYXNlIHVzaW5nIHRoZSBteXNxbCBjb25uZWN0aW9uLnF1ZXJ5IGZ1bmN0aW9uXG4gICAgICB1dGlscy5jb2xsZWN0RGF0YShyZXF1ZXN0LCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbm5lY3Rpb24ucXVlcnkoYERFTEVURSBGUk9NIHdlZWRzIFdIRVJFIGlkID0gJyR7ZGF0YS5pZH0nYCwgZnVuY3Rpb24oZXJyLCByZXN1bHRzLCBmaWVsZHMpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB1dGlscy5zZW5kNDA0KHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMuc2VuZFJlc3BvbnNlKHJlc3BvbnNlLCAnV2VlZCBkZWxldGVkIGZyb20gZGF0YWJhc2UnLCAyMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==