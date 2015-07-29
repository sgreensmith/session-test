var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hogan = require('hogan-express');

// ############################################# taken from online tutorial at 'codeforgeek.com'
var session = require('express-session')

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hjs');        // this has been replaced by what is seen in lines 7, 22 and 23

//################## alternative setup from hogan express npm resource
app.set('view engine', 'html');
app.engine('html', hogan);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ############################################# taken from online tutorial at 'codeforgeek.com'
app.use(session({secret: 'ssshhhhh'}));     // initialise the session

// #############################################    taken from online tutorial 'modulus.io'
//app.use(cookieParser);
//app.use(express.session({secret: '1234567890QWERTY'}));




app.use('/', routes);
app.use('/users', users);

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// ###  ~~~~~~~~~~~~~~~~~~~         basic session example ---------------------- NOT WORKING
//var sess;
//app.get('/session-test', function(req, res){
//  sess=req.session;     // initialise the session based on 'req'
//  res.render('session', {
//  });
//});

module.exports = app;
