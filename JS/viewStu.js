const student = require('../models/studentmodel');

module.exports={
    viewStu:function(res){
        student.find({},function(err,result){
            if(err){
                res.send("Error while fetching the doucments form the db. Please try again later");
            }else{
                res.render('ShowStu.ejs',{'result':result});
            }
        })

    },
    viewDue:function(res){
        student.find({due:{$gt:0}},function(err,result){
            if(err){
                res.send("Error while fetching the doucments form the db. Please try again later");
            }else{
                res.render('ShowStu.ejs',{'result':result});
            }
        })

    },
    deleteStu:function(id,res){
        student.findOneAndDelete({'_id':id},function(err,result){
            if(err){
                res.send("false");
            }
            else{
                res.send("true");
            }
        })
    },
    searchStu:function(id,res){
        student.findOne({'rollno':id},function(err,result){
            if(err){
                res.send("false");
            }
            else{
                res.render('SearchStudent.ejs',{'result':result});
            }
        })
    },

    editStu:function(id,res){
        student.find({'_id':id},function(err,result){
            res.render('EditStudent.ejs',{'result':result});
        })
    }
}