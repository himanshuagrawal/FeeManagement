const admin = require('../../models/AdminModel.js');

module.exports = {
    verifyadmin: function (obj, req, res, jwt) {
        admin.findOne({ name: obj.name, password: obj.password }, function (err, result) {
            if (result != null) {
                obj.userType="Admin";
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