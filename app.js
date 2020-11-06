var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require("express-session");
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var proRouter = require('./routes/pro');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var cartRouter = require('./routes/cart');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
const cookieParser = require('cookie-parser');
var app = express();
// view engine setup

//cookie路由守卫
app.use(cookieParser());
// app.all('*',(req,res,next)=>{
//   console.log('我进入了全局守卫');
//   console.log(req.cookies);
//    // 第一个选项 如果我给你了islogin = ok cookie 你可以直接跳
// //   //第一步 是针对合法用户的   第二三部分 是针对 非法用户的放行条件  让他走正门！！！！
// //   // if第一步 req.cookies.islogin === 'ok'是针对于 合法用户  直接放行  req.url === '/login'  req.url ==='/login/in'是针对友善的非法用户去登录页面 
//   if(req.cookies.islogin === 'ok'|| req.url==='/login' || req.url==='/login/in' || req.url==='/register' || req.url==='/register/in'){
//     console.log('next之前');
//     next()
//   }else{
// //想不登录就访问其他页面的用户比如/pro 直接让他强制跳转  /login
// //     //我们强制让非法用户跳转/login
//     console.log('cookie守卫路由else里面')
//     res.redirect('/login')
//   }
// })


app.use(
  session({
    //session 加密信息
    secret: "dudududu",
    //咱也不知道咱也不敢问 反正就用false就对了
    resave: false,
    //咱也不知道咱也不敢问 反正就用true就对了
    saveUninitialized: true,
    //过期时间
    cookie: { maxAge: 1000 * 10*60 },
  })
);


//session 路由守卫
app.all("*", (req, res, next) => {
  console.log("进入全局路由守卫gogogogo！");
  // req.session.islogin = 'ok'
  console.log(req.session);
  if (
    req.session.islogin === "ok" || req.url === "/login" ||  req.url === "/login/in" || req.url==='/register' || req.url==='/register/in'
  ) {
    // console.log("next之前");
    next();
  } else {
    // console.log("守卫");
     res.redirect("/login");
  }
});





 
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname))
//使用模板 引擎ejs
app.set('view engine', 'ejs');
// dev的时候会处理logger日志
app.use(logger('dev'));
// 使用express的json模块 可以接收和处理现在最常用方便的JSON数据 脚手架已经配好
app.use(express.json());
//xtended: false：表示使用系统模块querystring来处理，也是官方推荐的  
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//以下是路由表的use  必须先命中第一个路由表  才能进入后面的indexRouter 等 注意！
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/pro', proRouter);


app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);



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
