var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var flash=require('connect-flash')
const session = require('express-session');
var db=require('./dbconfig/connection')
var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:"Key",
  cookie:{maxAge:600000}
}));
app.use(flash());

db.connect((err)=>{
  if(err)
  console.log("Connection Error"+err);
  else console.log("Database connected succesfully")
})

app.use('/', usersRouter);
app.use('/admin', adminRouter);

app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: "layout", layoutsDir: "views/layout/", partialsDir: __dirname + '/views/partials/' }))
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
