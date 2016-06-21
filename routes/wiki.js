var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	res.send('In get');
});

router.post('/', function(req, res, next) {
	res.send('In post');
});

router.get('/add', function(req, res, next) {
	res.render('addpage');
})

module.exports = router;
