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

//retreive all wiki pages:
router.get('/', function (req, res, next){
	//res.send('got to GET /wiki');
	//res.render('wikipage.html');
	res.redirect('/');
});

//submit a new page to the DB
router.post('/', function (req, res, next){
	console.log("body name: " + req.body.title);
	console.log("form control: " + req.body['content']);
	console.log("page-status: " + req.body['status']);
	//res.send('got to POST /wiki');

 	 var page = new Page({
    	title: req.body.title,
    	urlTitle: 'www.google.com',
    	content: req.body['content'],
    	status: true
  	});


// STUDENT ASSIGNMENT:
// make sure we only redirect *after* our save is complete!
// note: `.save` returns a promise or it can take a callback.
page.save()
.then(function () {
	console.log("saving...")
	res.redirect('/');
}, function(err){
	console.error(err);
});


// -> after save -> res.redirect('/');

});

//retreive the 'add a page' form:
router.get('/add', function (req, res, next){
	//res.send('got to GET /wiki/add');
	res.render('addpage.html');
});

module.exports = router;
