const express = require("express");
const { UserModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register",async(req,res) => {
    const {username,email,pass,role} = req.body;
    try{
        bcrypt.hash(pass, 8, async function(err, hash) {
            if(err){
                res.send({err})
            }else{
                const user = new UserModel({
                    username,email,pass:hash,role
                });
                await user.save();
                res.send({"mssg":"New user"})
            }
        });

    }catch(err){
        res.send({err})
    }
})

userRouter.post("/login",async(req,res) => {
    const {email,pass} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass, user.pass, function(err, result) {
                if(result){
                    const accessToken = jwt.sign({userID:user._id}, 'secret');
                    res.send({"mssg":"Logged in",accessToken})
                }else{
                    res.send({"mssg":"wrong credentials"});
                }
            })
        }else{
            res.send({"mssg":"User not found"})
        }
    }catch(err){
        res.send({err});
    }
})

module.exports = {
    userRouter
}