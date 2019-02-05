var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var verify = require('./JS/verifylogindb');
var Acc = require('./JS/addAcc');
var viewacc = require('./JS/viewacc');
var Stu = require('./JS/addStu');
var viewstu = require('./JS/viewStu');


mongoose.connect('mongodb://localhost:27017/newdb');

mongoose.connection.once('open', function () {
    console.log("The mongoose has been made successfully");
});

var app = express();


app.use(bodyparser.urlencoded({ "extended": true }));
app.use(bodyparser.json());
app.use(bodyparser.text());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'sssh, quiet! it\'s a secret!'
}
));
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  });
app.use('/JS', express.static(__dirname + '/static/JS'));
app.use('/CSS', express.static(__dirname + '/static/CSS'));
app.set('view engine', 'ejs');


app.listen(3000, function () {
    console.log("The connection has been made successfully");
});

const redirectLoginPageAdmin = function (req, res, next) {
    if (!req.session.adminuserid) {
        res.redirect('/home');
    } else {
        next();
    }
}

const redirectLoginPageAcc = function (req, res, next) {
    if (!req.session.accuserid) {
        res.redirect('/home');
    } else {
        next();
    }
}
const redirectHome = function (req, res, next) {
    if (req.session.adminuserid) {
        res.redirect('/adminhome');
    }else if(req.session.accuserid){
        res.redirect('/acchome');
    }
    else {
        next();
    }
}

//route
app.get('/home', redirectHome, function (req, res) {
    res.sendFile(__dirname + '/HTML/Home.html', function (err) {
        if (err) {
            res.end(err.message);
        }
    });
});

//api
app.post('/checkadminlogin', function (req, res) {
    var obj = JSON.stringify(req.body);
    verify.verifyadmin(obj, req, res);
});
//api
app.post('/checkAcclogin', function (req, res) {
    var obj = JSON.stringify(req.body);
    verify.verifyacc(obj,req, res);
});

//route
app.get('/adminhome', redirectLoginPageAdmin, function (req, res) {
    res.sendFile(__dirname + '/HTML/AdminHome.html');
});

//route
app.get('/acchome',redirectLoginPageAcc, function (req, res) {
    res.sendFile(__dirname + '/HTML/AccHome.html');
})
//route
app.get('/addaccountantform',redirectLoginPageAdmin, function (req, res) {
    res.sendFile(__dirname + '/HTML/AddAccountant.html');
})
//route
app.get('/addstudentform',redirectLoginPageAcc, function (req, res) {
    res.sendFile(__dirname + '/HTML/AddStudent.html');
})

//api
app.post('/addaccdb', function (req, res) {
    var obj = JSON.stringify(req.body);
    Acc.addAcc(obj, res);
})
//api
app.post('/addstudb', function (req, res) {
    var obj = JSON.stringify(req.body);
    Stu.addStu(obj, res);
})
//route
app.get('/viewacc',redirectLoginPageAdmin, function (req, res) {
    viewacc.viewAcc(res);
})
//route
app.get('/viewstu',redirectLoginPageAcc, function (req, res) {
    viewstu.viewStu(res);
})

//api
app.get('/deleteacc', function (req, res) {
    viewacc.deleteAcc(req.headers.id, res);
})
//api
app.post('/deletestu', function (req, res) {
    viewstu.deleteStu(req.headers.id, res);
})

//route
app.get('/editacc/:id',redirectLoginPageAdmin, function (req, res) {
    viewacc.editAcc(req.params.id, res);
})
//route
app.get('/editstu/:id',redirectLoginPageAcc, function (req, res) {
    viewstu.editStu(req.params.id, res);
})

//api
app.post('/updateaccdb', function (req, res) {
    var obj = JSON.stringify(req.body);
    Acc.updateAcc(obj, res);
})

//api
app.post('/updatestudb', function (req, res) {
    var obj = JSON.stringify(req.body);
    Stu.updateStu(obj, res);
})

//route
app.get('/viewstudue',redirectLoginPageAcc, function (req, res) {
    viewstu.viewDue(res);
})

//route
app.get('/searchstuform',redirectLoginPageAcc, function (req, res) {
    res.sendFile(__dirname + '/HTML/SearchStudent.html');
})

//route
app.get('/searchstu/:id',redirectLoginPageAcc, function (req, res) {
    viewstu.searchStu(req.params.id, res);
})

//api
app.post('/getstudent',function(req,res){
    var obj = JSON.stringify(req.body);
    Stu.getStu(obj,res);
})
//route
app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/home');
})

app.get('/*',function(req,res){
    res.send("<h1>Page Not Found</h1>");
})