var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');//引入session

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//session配置
app.use(session({
  secret:'myBlog',
  resave:false,
  saveUninitialized:true,
  cookie:{ maxAge: 1000 * 60 * 60 }//指定登录绘画的有效时长
}));

// 登录拦截
app.get('*',function (req,res,next) {//express中的app.get()请求，是在连接建立的时候起作用
  var power = {
    name : req.session.power || "游客",
    login : req.session.power ? true : false
  }
  var path = req.path;
  if( path == '/write' || path == '/writeArticles' || path == '/newArticles'){//访问write路径并且session没有等级权限的时候
    if(power.name == "游客"){
      res.redirect('/login');
    }
  }
  next();//next函数主要是用来确保所有注册的中间件被一个接一个的执行；
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

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
