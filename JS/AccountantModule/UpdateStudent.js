const student = require('../../models/StudentModel');

module.exports = {
    updateStu: function (stu, res) {
        student.update({ '_id': stu._id }, stu, function (err) {
            if (err) {
                res.send("false");
            } else {
                res.send("true");
            }
        })
    }
}