const student = require('../../models/StudentModel');

module.exports = {
    viewStu: function (res) {
        student.find({}, function (err, result) {
            if (err) {
                res.send("Error while fetching the doucments form the db. Please try again later");
            } else {
                res.render('ShowStu.ejs', { 'result': result });
            }
        })

    }
}