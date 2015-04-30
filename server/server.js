var mongoose   = require('mongoose');
mongoose.connect(require('./databaseCredentials'), function(err) {
    if (err) {
    	console.log('err:',util.inspect(err));
    	throw err;
    } else 
    {
    	console.log("connected");
    }
}); // connect to our database

var express    = require('express');    // call express
var app        = express();         // define our app using express
var restify = require('express-restify-mongoose')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var signature = require('./models/signature');
var eveSSO = require('./eveSSO');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();      
restify.serve(router, signature, {name : "signatures"});

//var signatureRouter = require('./signatureRouter');
//router = signatureRouter(router); // add our routes

// basic rooters for test
/*
// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' }); 
});*/

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(router);
app.use('/evesso/begin', eveSSO.beginSSO);
app.use('/evesso/callback', eveSSO.callbackSSO);

// serve staticly public folder
app.use('/', require('serve-static')('./public'));

// Pass any unrouted requests to index.html to let it handle the subrouting
app.use('/',function(req, res, next){
  res.sendFile(require('path').resolve(__dirname + '/../public/index.html'));
})

// START THE SERVER
// =============================================================================
exports.startServer = function(port, path, callback) {
  app.listen(port);
  console.log('Magic happens on port ' + port);
  callback();
}