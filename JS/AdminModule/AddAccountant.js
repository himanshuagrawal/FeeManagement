const accountant = require('../../models/AccountantModel.js');

module.exports = {
    addAcc: function (acc, res) {

        var acc1 = new accountant({
            name: acc.name,
            password: acc.password,
            email: acc.email,
            address: acc.address,
            contact: acc.contact
        });
        acc1.save(function (err) {
            if (err) {
                console.log(err.message);
                res.send("false");
            } else {
                res.send("true");
            }
        });
    },

    //new keyword creates a new document with a new id
}