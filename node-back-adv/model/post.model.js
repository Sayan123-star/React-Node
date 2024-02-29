const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
// creating a schema for posting the products with name, price and description
const postSchema = new mongoose.Schema({
    product_name:{
        type: String,
        required: true
    },
    product_quantity:{
        type: Number,
        required: true
    },
    product_price:{
        type: Number,
        required: true
    },
    // author of the user who logged in
    author: {
        type: ObjectId,
        ref: "UserModel"
    }
})
const PostModel = mongoose.model("PostModel",postSchema);
module.exports=PostModel;