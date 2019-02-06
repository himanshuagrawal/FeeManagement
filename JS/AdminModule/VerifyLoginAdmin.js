const admin = require('../../models/AdminModel.js');

module.exports = {
    verifyadmin: function (obj, req, res) {
        admin.findOne({ name: obj.name, password: obj.password }, function (err, result) {
            if (result != null) {
                req.session.adminuserid = 1;
                res.send("true");
            }
            else {
                res.send("false");
            }
        })
    }
}