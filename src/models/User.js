const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },

    verified:{
        type:Boolean,
        default:false
    },
    verificationCode:{
        type:String,
        select:false
    },
    verificationCodeValidation:{
        type:String,
        select:false
    }


});



module.exports =mongoose.model('User',userSchema);