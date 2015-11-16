var express = require( 'express' );
var chalk = require('chalk');
var morgan = require('morgan');
var swig = require('swig');
//var socketio = require('socket.io');
var routes = require('./routes/');

var app = express(); // creates an instance of an express application
var port = 3000;

var server = app.listen(port, function() {
	console.log('Now listening on port ',port);
});

//var io = socketio.listen(server);
//app.use('/', routes(io));
 app.use('/', routes);


// Setting up app to default to swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

app.use(morgan('common'));

//static files:
app.use(express.static(__dirname + '/public'));
