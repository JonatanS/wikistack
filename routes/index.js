var express = require('express');
var fs = require('fs');
var bp = require('body-parser');
var router = express.Router();
var models = require('../models/');
var Page = models.Page;
var User = models.User;




router.get('/', function (req, res, next) {
	Page.find({}).exec().then(function(pages) {
		res.render('index', {pages})
	})
	//res.render('index.html')
})



module.exports = router;