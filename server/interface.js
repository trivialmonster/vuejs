var fs = require("fs");

var loginInterface = function (req, res) {
    res.set('Content-Type', 'application/json');

    var userInfo = "";//用户信息

    req.on("data", function (chunk) {
        userInfo += chunk
    })
    req.on("end", function () {
        // fs.exists( __dirname + "/" + "jsondb/users.json", function(exists) {
        // 	if(!exists){
        // 		fs.writeFile( __dirname + "/" + "jsondb/users.json", JSON.stringify('test'), 'utf-8' );
        // 	}
        // });

        fs.readFile(__dirname + "/" + "jsondb/users.json", 'utf8', function (err, data) {
            data = JSON.parse(data);
            // console.log(data);
            userInfo = JSON.parse(userInfo);

            var code = "";
            var message = "";
            var resInfo = "";
            if (data[userInfo.userName]) {
                if (userInfo.passWord == data[userInfo.userName].password) {
                    code = "000000";
                    message = '登录成功';
                    resInfo = data[userInfo.userName];
                } else {
                    code = "000001";
                    message = '密码错误';
                    resInfo = null;
                }
            } else {
                code = "000002";
                message = '用户不存在';
                resInfo = null;
            }
            var respp = {
                'code': code,
                'message': message,
                'response': resInfo
            }

            res.end(JSON.stringify(respp));
        });
    });
}

var registerInterface = function (req, res) {
    res.set('Content-Type', 'application/json');

    var userInfo = "";

    req.on("data", function (chunk) {
        userInfo += chunk
    })
    req.on("end", function () {
        //添加的新用户数据
        userInfo = JSON.parse(userInfo);
        var user = {};
        user[userInfo.userName] = {};
        user[userInfo.userName].name = userInfo.userName;
        user[userInfo.userName].password = userInfo.passWord;

        fs.readFile(__dirname + "/" + "jsondb/users.json", 'utf8', function (err, data) {
            data = JSON.parse(data);
            if (data[userInfo.userName]) {
                var respp = {
                    'code': '000001',
                    'message': '用户已注册，请登录',
                    'response': null
                }

                res.end(JSON.stringify(respp));
            } else {
                data[userInfo.userName] = user[userInfo.userName];
                var code = "";
                var message = "";
                var resInfo = "";
                //写入
                fs.writeFile(__dirname + "/" + "jsondb/users.json", JSON.stringify(data, null, 4), function (err) {
                    if (err) {
                        code = '999999';
                        message = "注册失败";
                        resInfo = null;
                        console.log("写入失败");
                    } else {
                        code = '000000';
                        message = "注册成功";
                        resInfo = data[userInfo.userName];
                        console.log("写入成功");
                    }
                    var respp = {
                        'code': code,
                        'message': message,
                        'response': resInfo
                    }

                    res.end(JSON.stringify(respp));
                })
            }
        });
    })
}

module.exports.loginInterface = loginInterface;
module.exports.registerInterface = registerInterface;