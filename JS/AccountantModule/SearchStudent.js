const student = require('../../models/StudentModel');

module.exports = {
    searchStu: function (id, res) {
        student.findOne({ 'rollno': id }, function (err, result) {
            if (err) {
                res.send("false");
            }
            else {
                res.render('SearchStudent.ejs', { 'result': result });
            }
        })
    }
}