const mongoose = require('mongoose');

const schema = mongoose.Schema;

var stuschema = new schema({
    'rollno': Number,
    'name': String,
    'email': String,
    'sex': String,
    'course': String,
    'fee': Number,
    'paid': Number,
    'due': Number,
    'address': String,
    'contact': Number
});

const student = mongoose.model('Student', stuschema);

module.exports = student;