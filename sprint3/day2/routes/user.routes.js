const express = require("express");
const {UserModel} = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userRouter = express.Router();

userRouter.post("/register",async (req,res) => {
    const {username,email,pass} = req.body;
    try{
        // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        //     // Store hash in your password DB.
        // });

        bcrypt.hash(pass, 8, async function(err, hash) {
            if(err){
                res.send({"err":err})
            }else{
                const user = new UserModel({username,email,pass:hash});
                await user.save();
                res.send({"msg":"new user Registered"})

            }
        });
    }catch(e){
        res.send({"error":e})
    }
})

userRouter.post("/login",async(req,res) => {
    // bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
        // result == true
    // });
    const {email,pass} = req.body;
    try{
        const user = await UserModel.findOne({email});
        bcrypt.compare(pass, user.pass).then(function(result) {
            if( result){
                res.send({"mssg":"Login Successfully!","token":jwt.sign({ foo: 'bar' }, 'shhhhh')})

            }else{
                res.send({"msg":"User doesn't exists."})

            }
        });
    }catch(e){
        res.send({"err":e})
    }

})

module.exports = {
    userRouter
}