const acc = require('../../models/AccountantModel.js');

module.exports = {
    verifyacc: function (obj, req, res,jwt) {
        acc.findOne({ name: obj.username, password: obj.password }, function (err, result) {
            if (result != null) {
                obj.userType="Acc";
                jwt.sign(obj, 'This is the secret key', { expiresIn: 300 }, (err, token) => {
                    if(token!==undefined){
                    res.send(token);
                }else{
                    res.send("false");
                }
                })
            }
            else {
                res.send("false");
            }
        })
    }
}



