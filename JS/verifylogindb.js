const admin = require('../models/adminmodel.js');
const acc = require('../models/accountantmodel.js');

module.exports = {
    verifyadmin: function (obj,req,res) {
        obj = JSON.parse(obj);
        admin.findOne({ name: obj.name, password: obj.password }, function (err, result) {
            if (result != null) {
                req.session.adminuserid=1;
                res.send("true");
            }
            else {
                res.send("false");
            }
        })
    },


    verifyacc: function (obj,req,res) {
        obj = JSON.parse(obj);
        acc.findOne({ name: obj.username, password: obj.password }, function (err, result) {
            if (result != null) {
                req.session.accuserid=1;
                res.send("true");
            }
            else {
                res.send("false");
            }
        })
    }
}



