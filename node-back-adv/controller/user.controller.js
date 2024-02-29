// initialising bcrypt for  password hashing, jwt  for token generation and express as the web framework
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model.js');
const { JWT_SECRET } = require('../config.js');

// creating a new user  in the database with hashed password
const signup= async(req,res)=>{
    const {firstname,lastname,email,password,profileimage}=req.body;
    if(!firstname || !lastname|| !email|| !password){
        return res.status(400).send({message:'Please fill the mandatory fields'})
    }
    UserModel.findOne({email:email})
    .then(async(userInDB)=>{
        if(userInDB){
            return res.status(500).json({error:"Email already exists"})
        }
        try {
            const hash = await bcrypt.hash(password,10)
            const userData = await UserModel({firstname, lastname, email, password:hash, profileimage});
            const resp = await userData.save();
            res.status(200).send({message: 'User Registered successfully'})
        } catch (error) {
            console.log("Error occured");
            return res.status(401).send({error:"Internal error occured",error})
        } })
        .catch(()=>{console.log("Error in user check")})
}
// Matching  the entered password with the stored one to authenticate the user
const login= async(req,res)=>{
    const {email,password}=req.body;
    if(!email|| !password){
        return res.status(400).send({error: "Please fill the mandatory fields"})
    }
    UserModel.findOne({email:email})
    .then(async(userInDB)=>{
        if(!userInDB){
            return res.status(400).json({error:"Invalid credentials"})
        }
        
        try {
            await bcrypt.compare(password,userInDB.password)
            .then((didMatch)=>{
                if(didMatch){
                    const token =jwt.sign({_id: userInDB._id}, JWT_SECRET);
                    const userInfo = {"_id": userInDB._id,"firstname": userInDB.firstname, "lastname": userInDB.lastname, "email": userInDB.email}
                    res.status(200).send({result:{token: token, user: userInfo}})
                }else{
                    res.status(400).send({error:"Invalid credentials"})
                }
            })
        } catch (error) {
            console.log("error occured");
            return res.status(400).send({error:'Internal error',error})
        }})
}
module.exports={signup,login}