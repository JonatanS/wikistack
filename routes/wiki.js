var express = require('express');
var fs = require('fs');
var router = express.Router();
var models = require('../models/');
var Page = models.Page;
var User = models.User;

router.use('/', function (req, res, next){
	console.log("Path: " + req.path);
	console.log("Body: " + req.body.title);
	//res.render('index.html')
	next();
});

//retreive the 'add a page' form:
router.get('/add', function (req, res, next){
	//res.send('got to GET /wiki/add');
	res.render('addpage.html');
});


router.get("/:urlTitle", function (req, res) {
	// get page content by URL:
	console.log("render page: " + req.params.urlTitle);
	Page.findOne({'urlTitle' : req.params.urlTitle}).exec().then(function(page){
		//now we have a json object
		console.log(page);
		res.json(page);
	});
	//res.send('hit dynamic route at ' + req.params.urlTitle);
});

//submit a new page to the DB
router.post('/', function (req, res, next){
	console.log("body name: " + req.body.title);
	console.log("form control: " + req.body['content']);
	console.log("page-status: " + req.body['status']);
	//res.send('got to POST /wiki');

 	 var page = new Page({
    	title: req.body.title,
    	content: req.body['content'],
    	//urlTitle: urlTitle,
    	status: true
  	});
	page.save().then(function (saveResult) {
		var nextRoute = '/wiki/' + saveResult.urlTitle;
		console.log("saving and redirecting to: " + nextRoute);
		res.redirect(nextRoute);
		//res.json(saveResult);
		//next;
		}, function(err){
			console.error(err);
	});

});




module.exports = router;
