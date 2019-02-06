const acc = require('../../models/AccountantModel');

module.exports = {
    viewAcc: function (res) {
        acc.find({}, function (error, result) {
            res.render('ShowAcc.ejs', { 'result': result });
        })
    }
}