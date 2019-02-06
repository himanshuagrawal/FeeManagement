const student = require('../../models/StudentModel');

module.exports = {
    deleteStu: function (id, res) {
        student.findOneAndDelete({ '_id': id }, function (err, result) {
            if (err) {
                res.send("false");
            }
            else {
                res.send("true");
            }
        })
    }
}