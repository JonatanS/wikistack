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
	var urlTitle = this.title.replace(/[\W_]+/g,"_");
	if (urlTitle[urlTitle.length -1 ] === '_') urlTitle = urlTitle.slice(0, urlTitle.length -1);
	this.urlTitle = urlTitle;
	return next();
});


//static 'class' methods as opposed to instance methods:
pageSchema.statics.findByTag = function(tag){
	// $in matches a set of possibilities
	    return Page.find({
        tags: {
            $in: [tag]
        }
    }).exec();
	    
 //    var res = Page.find({ tags: {$elemMatch: {$eq: tag}}}).exec();

	// console.log("Result in findbytag : %s", res.toString());
	// return res;
}


var userSchema = new Schema( {
	name: {type: String, required: true},
	email: { type: String, required: true, unique: true}
});


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