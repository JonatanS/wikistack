var express = require( 'express' );
var chalk = require('chalk');
var morgan = require('morgan');
var swig = require('swig');
require('./filters')(swig);
var bodyParser = require('body-parser');
//var socketio = require('socket.io');
var routes = require('./routes/');

//var io = socketio.listen(server);
//app.use('/', routes(io));

var app = express(); // creates an instance of an express application
var port = 3000;

var server = app.listen(port, function() {
	console.log('Now listening on port ',port);
});

// HTTP body parsing (JSON or URL-encoded) middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submit
app.use(bodyParser.json()); // for AJAX (not used in this workshop)

app.use('/wiki', require('./routes/wiki'));
app.use('/', require('./routes'));

// Setting up app to default to swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

app.use(morgan('common'));

//static files:
app.use(express.static(__dirname + '/public'));
