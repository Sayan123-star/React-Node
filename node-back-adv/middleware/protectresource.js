const jwt = require( 'jsonwebtoken' );
const mongoose = require("mongoose");
const { JWT_SECRET } = require('../config');
const UserModel = mongoose.model("UserModel");
// Matching the authorization headers  to see if it is a token or basic auth
module.exports = (req, res, next)=>{
    const {authorization} = req.headers;
    //auth= Bearer 'json token'
    if(!authorization){
        return res.status(401).send({error: "The user is not logged in"})
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (error,payload)=>{
        if(error){
            return res.status(401).send({error: "The user is not log in"})
        }
        const {_id} = payload;
        UserModel.findById(_id)
        .then((dbUser)=>{
            req.user = dbUser;
            next();// Goes to the next middleware or goes to the REST API
        })
    })
}