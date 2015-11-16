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
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var User = new Schema( {
	name: String,
	email: { type:String, index: {unique: true} }
});


var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};