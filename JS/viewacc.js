var acc = require('../models/accountantmodel');

module.exports = {
     viewAcc : function(res) {
        acc.find({}, function (error, result) {
            res.render('ShowAcc.ejs', { 'result': result });
        })
    },

    deleteAcc :function(id,res){
        acc.deleteOne({'_id':id},function(err){
            if(err){
                res.send("false");
            }else{
                res.send("true");
            }
        });
    },

    editAcc: function(id,res){
        acc.find({'_id':id},function(err,result){
            res.render('editaccountant.ejs',{'result':result});
        })
    }
}