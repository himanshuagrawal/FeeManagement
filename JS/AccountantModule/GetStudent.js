const student = require('../../models/StudentModel');

module.exports = {

    getStu: function (stu, res) {
        student.find({ 'rollno': stu.rollno }, function (err, result) {
            if (JSON.stringify(result) != "[]") {
                res.send("true");
            } else {
                res.send('false');
            }
        })
    }

}