var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));

// create express router object for flowers
var router = express.Router();

// default: GET request to root
router.get('/', function(req, res) {
  
})

router.get('/:id', function(req, res) {

})

router.post('/', function(req, res) {

})

router.put('/:id', function(req, res) {

})

router.delete('/:id', function(req, res) {

})

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
  res.send('Express!!!');
});

app.get('/flower', function(req, res) {
  // must trigger a setState to display all the flowers in the
  // database
  connection.query('SELECT * FROM flowers', function(err, results, fields) {
    if (err) {
      console.error(err);
    } else {
      // setState in react
    }
    res.end();
  });
});

app.get('/flower:id', function(req, res) {
  // must trigger a setState to display only a single flower by
  // its id

});

app.post('/flower', function(req, res) {
  // must trigger a setState to add another flower to the
  // database
  connection.query(`INSERT INTO flowers (name, color, region) VALUES('${data.name}', '${data.color}', '${data.region}')`, function(err, results, fields) {
    if (err) {
      console.error(err);
    } else {
      utils.sendResponse(response, 'Flower saved to database', 200);
    }
  });
});

app.put('/flower:id', function(req, res) {
  // must trigger a setState to update only a single flower by
  // its id
  connection.query(`UPDATE flowers SET name = '${data.name}', color = '${data.color}', region = '${data.region}' WHERE id = '${data.id}'`, function(err, results, fields) {
    if (err) {
      console.error(err);
    } else {
      // trigger setState to update a flower in array of flowers
    }
    res.end();
  });
});

app.delete('/flower:id', function(req, res) {
  // must trigger a setState to delete a flower by its id
  connection.query(`DELETE FROM flowers WHERE id = '${data.id}'`, function(err, results, fields) {
    if (err) {
      console.error(err);
    } else {
      res.send(response, 'Flower deleted from database');
    }
    res.end();
  });
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
