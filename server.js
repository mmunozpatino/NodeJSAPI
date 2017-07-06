//base setup

var express = require('express'); //call express
var app = express();
var bodyParser = require('body-parser');

//configure app to use bodyParser() this will let us get the data from a POST

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; //set our port

//routes for our api

var router = express.Router();

//test route to make sure everything ir working

router.get('/', function(req, res) {
   res.json({ message: 'hooray! welcome to our api"'});
});

//more toutes for out API will happen here

app.use('/api', router);

//start the server

app.listen(port);
console.log('Magic happens on port '+ port);