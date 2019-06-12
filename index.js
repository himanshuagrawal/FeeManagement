//importing modules
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
const jsonwebtoken = require('jsonwebtoken');

var verifyLoginAdmin = require('./JS/AdminModule/VerifyLoginAdmin');
var verifyLoginAccountant = require('./JS/AccountantModule/VerifyLoginAccountant');

var addAccountant = require('./JS/AdminModule/AddAccountant');
var updateAccountant = require('./JS/AdminModule/UpdateAccountant');

var addStudent = require('./JS/AccountantModule/AddStudent');
var updateStudent = require('./JS/AccountantModule/UpdateStudent');
var getStudent = require('./JS/AccountantModule/GetStudent');

var viewAccountant = require('./JS/AdminModule/ViewAccountant');
var deleteAccountant = require('./JS/AdminModule/DeleteAccountant');
var editAccountant = require('./JS/AdminModule/EditAccountant');

var viewStudent = require('./JS/AccountantModule/ViewStudent');
var deleteStudent = require('./JS/AccountantModule/DeleteStudent');
var editStudent = require('./JS/AccountantModule/EditStudent');
var searchStudent = require('./JS/AccountantModule/SearchStudent');
var viewStudentDue = require('./JS/AccountantModule/ViewStudentDues');





//connecting to mongodb
mongoose.connect('mongodb://localhost:27017/newdb');
mongoose.connection.once('open', function () {
    console.log("The mongoose has been made successfully");
});


//using express and defining the properties
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
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});
app.use('/JS', express.static(__dirname + '/static/JS'));
app.use('/CSS', express.static(__dirname + '/static/CSS'));
app.set('view engine', 'ejs');


//defining the port
app.listen(3002, function () {
    console.log("The connection has been made successfully");
});


//middlewares defined for session control
const redirectLoginPageAdmin = function (req, res, next) {
    let token = req.headers.cookie.split('=')[2];
    let tokenData = jsonwebtoken.decode(token);
    jsonwebtoken.verify(token, 'This is the secret key', (err, obj) => {
        if (err||tokenData.userType=="Acc") {
            res.redirect('/home');
        } else {
            next();
        }
    })
    // if (!req.session.adminuserid) {
    //     res.redirect('/home');
    // } else {
    //     next();
    // }
}
const redirectLoginPageAcc = function (req, res, next) {
    let token = req.headers.cookie.split('=')[2];
    let tokenData = jsonwebtoken.decode(token);
    jsonwebtoken.verify(token, 'This is the secret key', (err, obj) => {
        if (err||tokenData.userType=="Admin") {
            res.redirect('/home');
        } else {
            next();
        }
    })
    // if (!req.session.accuserid) {
    //     res.redirect('/home');
    // } else {
    //     next();
    // }
}
const redirectHome = function (req, res, next) {
    let token = req.headers.cookie.split('=')[2];
    let tokenData = jsonwebtoken.decode(token);
    if (tokenData !== null) {
        if (tokenData.userType === 'Admin') {
            res.redirect('/adminhome');
        } else if (tokenData.userType === 'Acc') {
            res.redirect('/acchome');
        } else {
            next();
        }
    }else{
        next();
    }
    // if (req.session.adminuserid) {
    //     res.redirect('/adminhome');
    // } else if (req.session.accuserid) {
    //     res.redirect('/acchome');
    // }
    // else {
    //     next();
    // }
}


//route for home page
app.get('/home', redirectHome, function (req, res) {
    res.sendFile(__dirname + '/HTML/Home.html', function (err) {
        if (err) {
            res.end(err.message);
        }
    });
});


//route for admin homepage
app.get('/adminhome', redirectLoginPageAdmin, function (req, res) {
    res.sendFile(__dirname + '/HTML/AdminHome.html');
});


//route for accountant homepage
app.get('/acchome', redirectLoginPageAcc, function (req, res) {
    res.sendFile(__dirname + '/HTML/AccountantHome.html');
});


//route for add accountant form
app.get('/addaccountantform', redirectLoginPageAdmin, function (req, res) {
    res.sendFile(__dirname + '/HTML/AddAccountant.html');
});


//route for add student form
app.get('/addstudentform', redirectLoginPageAcc, function (req, res) {
    res.sendFile(__dirname + '/HTML/AddStudent.html');
});


//route for displaying the student who have dues
app.get('/viewstudue', redirectLoginPageAcc, function (req, res) {
    viewStudentDue.viewDue(res);
});



//route for searching a particular student using rollno
app.get('/searchstuform', redirectLoginPageAcc, function (req, res) {
    res.sendFile(__dirname + '/HTML/SearchStudent.html');
});



//route for displaying the data of the particular student whose rollno is provided
app.get('/searchstu/:id', redirectLoginPageAcc, function (req, res) {
    searchStudent.searchStu(req.params.id, res);
})


//route for displaying the edit form for the accountant
app.get('/editacc/:id', redirectLoginPageAdmin, function (req, res) {
    editAccountant.editAcc(req.params.id, res);
})


//route for viewing the accountants
app.get('/viewacc', redirectLoginPageAdmin, function (req, res) {
    viewAccountant.viewAcc(res);
})

//route for viewing the students
app.get('/viewstu', redirectLoginPageAcc, function (req, res) {
    viewStudent.viewStu(res);
})

//route for opening the edit student form
app.get('/editstu/:id', redirectLoginPageAcc, function (req, res) {
    editStudent.editStu(req.params.id, res);
})

//route for logging out
app.get('/logout', function (req, res) {
    res.clearCookie('token', { path: '/' });
    res.redirect('/home');
})


//api's

//api for checking admin login
app.post('/checkadminlogin', function (req, res) {
    verifyLoginAdmin.verifyadmin(req.body, req, res, jsonwebtoken);
});


//api for checking accountant login
app.post('/checkAcclogin', function (req, res) {
    verifyLoginAccountant.verifyacc(req.body, req, res,jsonwebtoken);
});


//api for adding the accountant to database
app.post('/addaccdb', function (req, res) {
    addAccountant.addAcc(req.body, res);
})

//api for updating the new accountant info to database
app.post('/updateaccdb', function (req, res) {
    updateAccountant.updateAcc(req.body, res);
})


//api for adding the student to database 
app.post('/addstudb', function (req, res) {
    addStudent.addStu(req.body, res);
})

//api for updating the new student info to database
app.post('/updatestudb', function (req, res) {
    updateStudent.updateStu(req.body, res);
})

//api for deleting the accountant
app.get('/deleteacc', function (req, res) {
    deleteAccountant.deleteAcc(req.headers.id, res);
})


//api for deleting the student
app.post('/deletestu', function (req, res) {
    deleteStudent.deleteStu(req.headers.id, res);
})

//api for getting the student
app.post('/getstudent', function (req, res) {
    getStudent.getStu(req.body, res);
})


//route for any incorrect URL
app.get('/*', function (req, res) {
    res.send("<h1>Page Not Found</h1>");
})