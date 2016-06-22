var express=require('express');
var app=express();
var morgan=require('morgan');
var path=require('path');
var bodyParser = require('body-parser');
var wikiRouter = require('./routes/wiki');
var swig=require('swig');
var models = require('./models');
var userRouter=require('./routes/users');
var searchRouter=require('./routes/search');




// Swig boiler plate
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views', __dirname+'/views');
swig.setDefaults({ cache: false });

// Body Parsing
app.use(bodyParser.urlencoded());

// Middleware
app.use(express.static(path.join(__dirname,'/public'))); //what dos this do?
app.use(morgan('dev'));

// Routes
app.use('/wiki', wikiRouter);
app.use('/users',userRouter);
app.use('/search',searchRouter);

app.get('/about',function(req,res,next){
	res.render('aboutpage');
})
app.get('/',function(req,res,next){
	models.Page.findAll()
	.then(function(pages){
		res.render('index',{pages: pages})
	})
	.catch(next);
})

//Syncing & Listening
models.User.sync({ force: true }) 
.then(function () {
    return models.Page.sync({}) //{ force: true }
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);


