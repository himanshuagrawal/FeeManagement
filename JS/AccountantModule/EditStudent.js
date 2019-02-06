const student = require('../../models/StudentModel');

module.exports = {
    editStu: function (id, res) {
        student.find({ '_id': id }, function (err, result) {
            res.render('EditStudent.ejs', { 'result': result });
        })
    }
}