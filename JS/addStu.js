var student = require('../models/studentmodel');

module.exports = {
    addStu: function (obj, res) {
        obj = JSON.parse(obj);
        var rollno = parseInt(Math.random() * 10000);
        var stu1 = new student({
            'rollno':rollno,
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
    },
    updateStu:function(obj,res){
        let stu = JSON.parse(obj);
        student.update({'_id':stu._id},stu,function(err){
            if(err){
                res.send("false");
            }else{
                res.send("true");
            }
        })
    },
    getStu:function(obj,res){
        let stu = JSON.parse(obj);
        student.find({'rollno':stu.rollno},function(err,result){
            if(JSON.stringify(result)!="[]"){
                res.send("true");
            }else{
                res.send('false');
            }
        })
    }
}
