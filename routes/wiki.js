var express = require('express');
var fs = require('fs');
var router = express.Router();
var models = require('../models/');
var Page = models.Page;
var User = models.User;

router.use('/', function (req, res, next){
	// console.log("Path: " + req.path);
	// console.log("Body: " + req.body.title);
	next();
});

//retreive the 'add a page' form:
router.get('/add', function (req, res, next){
	//res.send('got to GET /wiki/add');
	res.render('addpage.html');
});

router.get("/search", function (req, res) {
	var reqArr = req.query.search.split(" ");
	var foundPages = Page.findByTag(reqArr[0]);
	res.render('index', foundPages);

});


router.get("/:urlTitle", function (req, res) {
	// get page content by URL:
	Page.findOne({'urlTitle' : req.params.urlTitle}).exec().then(function(page){
		//now we have a json object
		//Double object??
		res.render('wikipage', page);
	});
	//res.send('hit dynamic route at ' + req.params.urlTitle);
});

//submit a new page to the DB
router.post('/', function (req, res, next){
	console.log("req body ", req.body);
 	 var page = new Page({
    	title: req.body.title,
    	content: req.body.content,
    	tags: req.body.tags.split(","),
    	status: true
  	});
	page.save().then(function (saveResult) {
		//var nextRoute = '/wiki/' + saveResult.urlTitle;
		// console.log("saving and redirecting to: " + nextRoute);
		res.redirect(saveResult.route);
		//res.json(saveResult);
		}, function(err){
			console.error(err);
	});

});






module.exports = router;
