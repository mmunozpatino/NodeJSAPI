//base setup

var express = require('express'); //call express
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');//connect to our database

var Bear = require('./app/models/bear');
//configure app to use bodyParser() this will let us get the data from a POST

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; //set our port

//routes for our api

var router = express.Router();

// el router se ejecuta en el orden que se defina acá
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.get('/', function(req, res) {
   res.json({ message: 'hooray! welcome to our api!'});
});

//more toutes for out API will happen here

//resitrer our routes
app.use('/api', router);

//start the server

app.listen(port);
console.log('Magic happens on port '+ port);