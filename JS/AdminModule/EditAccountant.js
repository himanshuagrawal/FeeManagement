const acc = require('../../models/AccountantModel');

module.exports = {
    editAcc: function (id, res) {
        acc.find({ '_id': id }, function (err, result) {
            res.render('editaccountant.ejs', { 'result': result });
        })
    }
}