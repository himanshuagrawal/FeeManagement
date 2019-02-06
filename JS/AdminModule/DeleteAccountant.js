const acc = require('../../models/AccountantModel');

module.exports = {
    deleteAcc: function (id, res) {
        acc.deleteOne({ '_id': id }, function (err) {
            if (err) {
                res.send("false");
            } else {
                res.send("true");
            }
        });
    }
}