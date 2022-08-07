const mongoose = require('mongoose');

const userScheema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:255,
        min:7
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:7
    },
    password:{
        type:String,
        required:true,
        max:255,
        min:7
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User',userScheema);