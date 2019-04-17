console.log('执行nodejs --> server.js');

var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //编码解析
var session = require('express-session');
// var cookieParser = require('cookie-parser');
// var history = require('connect-history-api-fallback'); //   vue-router history

//接口
var { loginInterface, registerInterface } = require('./interface.js');

app.use(express.static(path.resolve(__dirname, '../public')));
// app.use(cookieParser());
// app.use(history());

app.use(session({
    secret: '12345',
    name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 60000 }, //设置maxAge是60000ms，即60s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));


app.get('/', function (req, res) {
    res.send('server.js');
});
app.get('/test', function (req, res) {
    res.send('server.js');
});

//登录接口
app.post('/login', urlencodedParser, function (req, res) {
    req.session.lastPage = 'login';
    console.log(req.session.lastPage);
    loginInterface(req, res);
});

//注册接口
app.post('/register', urlencodedParser, function (req, res) {
    registerInterface(req, res);
})

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
