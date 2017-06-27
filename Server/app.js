// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var users = require('./routes/users');
var items = require('./routes/items');
var carts = require('./routes/carts');
var connection = require('tedious').connection;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//-------------------------------------------------------------------------------------------------------------------
app.use(express.static( __dirname+'/../public'));
//-------------------------------------------------------------------------------------------------------------------
var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
/*app.get('/users', function(req, res) {
    res.send('hooray! welcome to our api!');
});*/

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/users', users);
app.use('/items', items);
app.use('/carts', carts);
// START THE SERVER
// =============================================================================
app.listen(port, function(){
    console.log('Magic happens on port ' + port);
});

