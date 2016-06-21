var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 
var Promise=require('bluebird');



router.get('/',function(req,res,next){
	User.findAll()
	.then(function(users){
		res.render('users',{users: users})
	})
	.catch(next);
});

router.get('/:id',function(req,res,next){
	res.send(req.params.id);
});


module.exports = router;
