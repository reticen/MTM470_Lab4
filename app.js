var express = require('express');
var sessions = require('express-session');
var path = require('path');

var app = express();
var hour = 1000 * 60 * 60;

//Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Set up sessions
app.use(sessions({
    secret: 'areallysecretkey',
    cookie: { expires: (Date.now() + hour), maxAge: hour }, //in milliseconds
    resave: false,
    saveUninitialized: true
}));

app.use('/', require('./controllers/home.js'));
app.use('/register', require('./controllers/registration.js'));
app.use('/signin', require('./controllers/signin.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.listen(3000);

app.get('/story/:id', function(req,res){
    res.render('story');
});