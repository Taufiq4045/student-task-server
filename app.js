require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('./connection');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var assignmentRouter = require('./routes/assignment');
var registerRouter = require('./routes/reg');
var authorise = require('./module/authModule');
var userPassword = require('./routes/userPassword');
var registerAdmin = require('./routes/regAdmin');
var adminPassword = require('./routes/adminPassword')
var assignmentReports = require('./routes/report');

var app = express();
mongo.connect();
app.use(cors());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', registerRouter);
app.use('/admin', registerAdmin);
app.use('/userpassword', userPassword);
app.use('/adminpassword', adminPassword);
app.use(authorise.AuthorizeUser);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assignment', assignmentRouter);
app.use('/report', assignmentReports);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
