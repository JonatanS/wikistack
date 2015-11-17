var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
var Schema = mongoose.Schema;


//using vaidation to require certain fields are set:
var pageSchema = new Schema( {
	title: {type: String, required: true},
	urlTitle: {type: String, required: true},
	content: {type: String, required: true},
	date: {type: Date, default: Date.now},
	status: Boolean,
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	tags: [String]
	// The ref option is what tells Mongoose which model to use during population — in our case the User model.
	//All _ids we store here must be document _ids from the User model.
});

//pre-VALIDATE URL there is also a pre'save':
//http://mongoosejs.com/docs/middleware.html
pageSchema.pre('validate', function (next){
	console.log("pre-save title: "+ this.title);
	var urlTitle = this.title.replace(/[\W_]+/g,"_");
	if (urlTitle[urlTitle.length -1 ] === '_') urlTitle = urlTitle.slice(0, urlTitle.length -1);
	console.log("urlTitle " + urlTitle);
	this.urlTitle = urlTitle;
	console.log("tags " + tags);
	return next();
});

// pageSchema.pre('save', function (next) {
// 	var convertTags =
// })

var userSchema = new Schema( {
	name: {type: String, required: true},
	email: { type: String, required: true, unique: true}
});

/*
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
  ////console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation
  //use .populate command to fetch both the page and author name as a multi-request
}
*/

pageSchema.virtual('route').get(function () {
	return  '/wiki/' + this.urlTitle;
});


//compile the schemas into models using mongoose.model():
var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};