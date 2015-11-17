var express = require('express');
var fs = require('fs');
var router = express.Router();

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
	res.send('got to POST /wiki');
});

//retreive the 'add a page' form:
router.get('/add', function (req, res, next){
	//res.send('got to GET /wiki/add');
	res.render('addpage.html');
});

module.exports = router;