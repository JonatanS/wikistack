var express = require('express');
var fs = require('fs');
var bp = require('body-parser');
var router = express.Router();

router.use('/', function (req, res){
	console.log("Path: " + req.path);
	console.log("Body: " + req.body);
	res.render('index.html')
});


module.exports = router;