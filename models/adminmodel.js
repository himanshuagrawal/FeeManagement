const mongoose = require('mongoose');
const schema = mongoose.Schema;

var adminschema = new schema({
    name:String,
    password:String
});

const admin = mongoose.model('admin',adminschema);

module.exports = admin; 