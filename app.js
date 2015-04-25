var express = require('express');

var session = require('express-session');

var sessionstore = require('sessionstore');
var os = require("os");
var path = require('path');

var favicon = require('static-favicon');

var logger = require('morgan');

var cookieParser = require('cookie-parser');

var methodOverride = require('method-override');

var bodyParser = require('body-parser');

var flash = require('connect-flash');

//var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(favicon());

//app.use(logger('dev'互联网招聘));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

app.use(methodOverride());

app.use(cookieParser());


/** session **/

app.use(session({

  secret: 'fens.me',

  cookie: {
    maxAge: 900000
  },
  //session 的 保存时间，这里是半小时
  store: sessionstore.createSessionStore()

}));

/** message tip **/

app.use(flash()); //使用消息提示
/** end **/

app.use(require('stylus').middleware(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.all("/",function(req, res) {

  res.render('login', {

    title: '用户登录',

    error: req.flash('error').toString()

  });
/// catch 404 and forward to error handler
  app.use(function (req, res, next) {

    var err = new Error('Not Found');

    err.status = 404;

    next(err);

  });

/// error handlers

// development error handler
// will print stacktrace
  if (app.get('env') === 'development') {

    app.use(function (err, req, res, next) {

      res.status(err.status || 500);

      res.render('error', {

        message: err.message,

        error: err

      });

    });

  }

// production error handler
// no stacktraces leaked to user
  app.use(function (err, req, res, next) {

    res.status(err.status || 500);

    res.render('error', {

      message: err.message,

      error: {}

    });

  });

  app.listen(os.hostname());

  console.log("Server running at http://" + os.hostname());
});