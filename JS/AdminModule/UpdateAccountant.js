const accountant = require('../../models/AccountantModel.js');

module.exports = {
    updateAcc: function (acc, res) {
        accountant.update({ '_id': acc._id }, acc, function (err) {
            if (err) {
                res.send("false");
            } else {
                res.send("true");
            }
        })
    }
}