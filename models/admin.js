const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
        enum: {
            values: ['Bangalore','Pune','Mangalore','Chennai','Hyderabad','Delhi'],
            message: '{VALUE} is not a valid address'
        }
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5
    },
    role: {
        type: String,
        required: true,
        minlength: 5
    }
});

const Admin=mongoose.model('Admin', adminSchema, 'admin');
module.exports = Admin;