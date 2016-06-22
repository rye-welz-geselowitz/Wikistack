var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 
var Promise=require('bluebird');



router.get('/',function(req,res,next){
	res.render('tagsearch.html');
})

router.get('/read',function(req,res,next){

	var tags=req.query.tag.replace(/,/, '_').split("_");
	//res.send(tags);
	Page.findByTag(tags).then(function(result){
		//res.send(result);
    	res.render('index',{pages:result});
    })
    .catch(next);

    // Page.find({
    //     where : {
    //        tags: {
    //             $overlap: req.query.tag.split()
    //         }
    //     }    
    // }).then(function(result){
    // 	res.render('index',result);
    // })

})



module.exports=router;