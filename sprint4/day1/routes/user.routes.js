const express = require("express");
const bcrypt =  require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken")

const userRouter = express.Router();

userRouter.post("/register",(req,res) => {
    const {username,pass,email} = req.body;
    try{
        bcrypt.hash(pass, 8, async function(err, hash) {
            if(hash){
                const user = new UserModel({username,email,pass:hash});
                await user.save();
                res.send({"mssg":"New usere has been added."})
            }else{
                res.send({"mssg":"error creating hash",err})
            }
        });
    }catch(err){
        res.send({"Error":err})
    }
})

userRouter.post("/login",async(req,res) => {
    const {email,pass} = req.body;
    try{
        const user = await UserModel.findOne({email});
        bcrypt.compare(pass, user.pass, function(err, result) {
            if(result){
                const token = jwt.sign({user},"masai");
                res.send({"mssg":"Logged in",token})
            }else{
                res.send({"mssg":"Wrong credentials",})
            }
        });
    }catch(err){
        res.send({"Error":err,})
    }
})


module.exports = {
    userRouter
}