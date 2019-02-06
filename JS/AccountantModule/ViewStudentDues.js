const student = require('../../models/StudentModel');

module.exports = {
    viewDue: function (res) {
        student.find({ due: { $gt: 0 } }, function (err, result) {
            if (err) {
                res.send("Error while fetching the doucments form the db. Please try again later");
            } else {
                res.render('ShowStu.ejs', { 'result': result });
            }
        })

    },

}