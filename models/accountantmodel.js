const mongoose = require('mongoose');
const schema = mongoose.Schema;

var accSchema = new schema({
    name: String,
    password: String,
    email: String,
    address: String,
    contact: Number
});

var accountant = mongoose.model('acc', accSchema);

module.exports = accountant;