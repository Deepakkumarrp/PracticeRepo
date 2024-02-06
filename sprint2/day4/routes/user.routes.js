const {UserModel} = require("../model/user.model");

const express = require("express");
// const app = express();
// Already invoking express in index.js

const userRouter = express.Router();

userRouter.get("/",async(req,res) => {
    try{
        // Read 
        const users = await UserModel.find(req.query);
        res.status(200).send({"users":users})
    }catch(err){
        res.status(400).send({"error":err})
    }
})

userRouter.post("/", async(req,res) => {
    const payload = req.body;
    try{
        // Add
        const user = new UserModel(payload);
        await user.save();
        res.status(200).send({"msg":"New user has been added."})
    }catch(err){
        res.status(400).send({"error":err});
    }
})

userRouter.patch("/:userID", async(req,res) => {
    const {userID} = req.params;
    try{
        // Mongosse way to update
        await UserModel.findByIdAndUpdate({_id:userID},req.body)
        res.status(200).send({"msg":"The user has been updated."})
    }catch(err){
        res.status(400).send({"error":err});
    }
})

userRouter.delete("/:userID", async(req,res) => {
    const {userID} = req.params;
    try{
        // Mongosse way to delete
        await UserModel.findByIdAndDelete({_id:userID})
        res.status(200).send({"msg":"The user has been updated."})
    }catch(err){
        res.status(400).send({"error":err});
    }
})

module.exports = {userRouter}
