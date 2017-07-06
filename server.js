//base setup

var express = require('express'); //call express
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Bears');//connect to our database

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


//on routes that end in /bears

router.route('/bears').
    post(function(req, res){
        var bear = new Bear();
        bear.name = req.body.name;

        //save the bear and check for errors
        bear.save(function(err){
            if(err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
    })
    .get(function(req, res){
        Bear.find(function(err, bears){
            if (err)
                res.send(err);
            
            res.json(bears);
        });
    });

//on routes thar end in /bears/:bear_id

router.route('/bears/:bear_id')
    //get the bear with that id
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    //upgrade the bear with this id
    .put(function(req, res) {
        //use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear){
            if (err)
                res.send(err);
            
            bear.name = req.body.name; // update the bears info
            //save the bear
            bear.save(function(err){
                if (err)
                    res.send(err);
                res.json({ message: 'Bear updated!'});
            });
        });
    })
    //delete the bear with this id
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear){
            if(err)
                res.send(err);
            
            res.json({ message: 'Successfully deleted!'});
        });
    });
//more toutes for out API will happen here

//resitrer our routes
app.use('/api', router);


//start the server

app.listen(port);
console.log('Magic happens on port '+ port);