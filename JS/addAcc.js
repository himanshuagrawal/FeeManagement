var accountant = require('../models/accountantmodel.js');

module.exports = {
    addAcc : function(obj,res){

    let acc = JSON.parse(obj);
    var acc1 = new accountant({
        name:acc.name,
    password:acc.password,
    email:acc.email,
    address:acc.address,
    contact:acc.contact
    });

    acc1.save(function(err){
        if(err){
            console.log(err.message);
            res.send("false");
        }else{
            res.send("true");
        }
    });
},
//new keyword creates a new document with a new id
updateAcc:function(obj,res){
    console.log("Updated");
    let acc = JSON.parse(obj);
    console.log(acc);
    accountant.update({'_id':acc._id},acc,function(err){
        if(err){
            res.send("false");
        }else{
            res.send("true");
        }
    })
}
}