const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
            values: ['Bangalore','Pune','Mangalore','Chennai','Hyderabad'],
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
    }
});

const User=mongoose.model('User', userSchema, 'user');
module.exports = User;