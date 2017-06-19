var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'Content-Type': 'application/json'
};

exports.sendResponse = function(response, obj, status) {
  status = status || 200;
  headers['Content-Type'] = 'application/json';
  response.writeHead(status, headers);
  response.end(obj);
};

exports.sendHTML = function(response, file, status) {
  status = status || 200;
  headers['Content-Type'] = 'text/html';
  response.writeHead(status, headers);
  // response.write(file);
  // console.log(typeof file);
  response.end(file);
}

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(JSON.parse(data));
  });
};

exports.send404 = function(response) {
  exports.sendResponse(response, '404: Page Not Found', 404);
}
