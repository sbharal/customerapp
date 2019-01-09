var express = require('express');
var bodyParser = require('body-parser');
var path = require('path'); //used to simplify file path
var expressValidator = require('express-validator');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['userdetails']);
var ObjectId = mongojs.ObjectId;


// var logger = function(req, res, next){
//     console.log('Logging in...');
//     next();
// }
// app.use(logger);

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set static path
app.use(express.static(path.join(__dirname, 'public')));

//Global vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

//Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        }
    }
}));

app.get('/', function(req, res){
    db.userdetails.find(function(err, docs){
        //console.log(docs);
         //res.send('<h1><center>Welcome To Customer Management Application</center></h1>');
    res.render('index', {
        title: 'Customer Management Application',
        userdetails: docs
    });
    //res.json(people);
    })
   
})

app.post('/userdetails/add', function(req, res){

req.checkBody('first_name', 'First Name Required').notEmpty();
req.checkBody('last_name', 'Last Name Required').notEmpty();
req.checkBody('email', 'Email Required').notEmpty();

var errors = req.validationErrors();
var userdetails = [];

if(errors){

    db.userdetails.find(function(err, docs){
        res.render('index', {
            title: 'Customer Management Application',
            userdetails: docs,
            errors: errors
        });
    })
    //console.log("inside")
        //res.send('<h1><center>Welcome To Customer Management Application</center></h1>');
        
        //res.json(people);
        
        
} else {
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
    //console.log('SUCCESS');
    db.userdetails.insert(newUser, function(err, result){
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
            }
        })
    }
    
})

app.delete('/userdetails/delete/:id', function(req, res){
    db.userdetails.remove({_id: ObjectId(req.params.id)}, function(err, result){
        if(err){
            console.log(err);
        }
        res.redirect('/');
    })
})

app.listen(process.env.PORT || 5000, function(){
    console.log('Server Started at port 5000...');
})