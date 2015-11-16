var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
var Schema = mongoose.Schema;

var Page = new Schema( {
	title: String,
	urlTitle: String,
	content: String,
	date: {type: Date, default: Date.now},
	status: Boolean,
	author: String
});

var User = new Schema( {
	name: String,
	email: { type:String, index: {unique: true} }
});

/*field: {type: String},
field: {type: Number},
field: {type: Date },
field: {type: Boolean},
field: {type: Array},
field: {type: Object},
field: {type: mongoose.Schema.Types.ObjectId, ref: 'Model'}
*/