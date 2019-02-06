const student = require('../../models/StudentModel');

module.exports = {
    addStu: function (obj, res) {
        var rollno = parseInt(Math.random() * 10000);
        var stu1 = new student({
            'rollno': rollno,
            'name': obj.name,
            'email': obj.email,
            'sex': obj.sex,
            'course': obj.course,
            'fee': obj.fee,
            'paid': obj.paid,
            'due': obj.due,
            'address': obj.address,
            'contact': obj.contact
        });

        stu1.save(function (err) {
            if (err) {
                res.send("false");
            } else {
                res.send("true");
            }
        })
    }
}
