var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 


router.get('/', function(req, res, next) {
	res.redirect('/');
});

router.post('/', function(req, res, next) {

  // var page = Page.build({
  //   title: req.body.title,
  //   content: req.body.content,
  //   authorId: user.id
  // });

User.findOrCreate({
  	where: {
  		name: req.body.author,
  		email: req.body.author_email
  	}
  })
  .then(function(result){
  	var page = Page.build({
	    title: req.body.title,
	    content: req.body.content,
	    authorId: result[0].id
	  })
  	return page.save();
  })
  .then(function(otherResult) {
  	res.redirect(otherResult.route);
  })
  .catch(next); 
  
});

router.get('/add', function(req, res, next) {
	res.render('addpage');
});

router.get('/:urlName', function(req, res, next) {
	Page.findOne({ 
		where: {
			urlTitle: req.params.urlName
		}
	})
	.then(function(foundPage) {
		// res.render('wikipage',{title:foundPage.title, content:foundPage.content,urlTitle:foundPage.urlTitle});
		User.findOne({
			where: {
				id: foundPage.authorId
			}
		})
		.then(function (userResult) {
			res.render('wikipage', {page: foundPage, user: userResult});
		});
		
		//res.json(foundPage);
	})
	.catch(next);
})

module.exports = router;













