var express = require('express');
var fs = require('fs');
var router = express.Router();
var models = require('../models/');
var Page = models.Page;
var User = models.User;

router.use('/', function (req, res, next){
	console.log("Path: " + req.path);
	// console.log("Body: " + req.body.title);
	next();
});

//retrieve the 'add a page' form:
router.get('/add', function (req, res, next){
	//res.send('got to GET /wiki/add');
	res.render('addpage.html');
});

router.get('/search', function (req, res, next) {

    var tagToSearch = req.query.search;

    Page.findByTag(tagToSearch)
        .then(function (pages) {
            res.render('index', { pages: pages });	//whaaaaaa!!!! Our problem was not to feed it in as an object :(
        })
        .then(null, next);

});


router.get("/:urlTitle", function (req, res) {
	// get page content by URL:
	Page.findOne({'urlTitle' : req.params.urlTitle}).exec().then(function(page){
		//now we have a json object
		//Double object??
		res.render('wikipage', page);
	});
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
