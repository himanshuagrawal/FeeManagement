const acc = require('../../models/AccountantModel.js');

module.exports = {
    verifyacc: function (obj, req, res) {
        acc.findOne({ name: obj.username, password: obj.password }, function (err, result) {
            if (result != null) {
                req.session.accuserid = 1;
                res.send("true");
            }
            else {
                res.send("false");
            }
        })
    }
}



