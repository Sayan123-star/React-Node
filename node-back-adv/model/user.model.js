const mongoose = require('mongoose');
// Creating a new schema for the user model in MongoDB.
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profileimage:{
        type: String,
        required: false
    }
})
const UserModel= mongoose.model("UserModel", userSchema)
module.exports= UserModel;