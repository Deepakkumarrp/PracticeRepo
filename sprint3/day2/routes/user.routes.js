const express = require("express");
const {UserModel} = require("../model/user.model")

const userRouter = express.Router();

userRouter.post("/register",async (req,res) => {
    const payload = req.body;
    try{
        const user = new UserModel(req.body);
        await user.save();
        res.send({"msg":"new user Registered","newUser":req.body})
    }catch(e){
        res.send({"error":e})
    }
})

userRouter.post("/login",async(req,res) => {
    const {email,pass} = req.body;
    try{
        const user = UserModel.findOne({email,pass});
        if(user){
            
        }
    }catch(e){
        res.send({"err":e})
    }

})

module.exports = {
    userRouter
}