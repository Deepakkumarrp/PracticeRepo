const express = require("express");
const { NoteModel } = require("../model/note.model");
const { UserModel } = require("../model/user.model");
const { auth } = require("../middleware/auth.middleware");
// const bcrypt =  require("bcrypt");
// const jwt = require("jsonwebtoken");

const noteRouter = express.Router();

noteRouter.use(auth);

noteRouter.post("/",async(req,res) => {
    try{
        const note = NoteModel(req.body);
        await note.save();
        res.send({"mssg":"New note has been added"})
    }catch(err){
        res.send({err})
    }
})
noteRouter.get("/",async (req,res) => {
    try{
        const notes = await NoteModel.find({userID:req.body.userID});
        res.send({notes});
    }catch(err){
        res.send({err})
    }
})
noteRouter.patch("/:noteID",async(req,res) => {
    const {noteID} = req.params;
    try{
        // UserID present in note === userID in the req.body
        const note = await NoteModel.findOne({_id:noteID});
        if(note.userID === req.body.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body);
            res.send({"mssg":`The note with ID: ${noteID} has been updated.`})
        }else{
            res.send({"mssg":"You're not authorized."})
        }
    }catch(err){
        res.send({err});
    }
})
noteRouter.delete("/:noteID",async (req,res) => {
    const {noteID} = req.params;
    try{
        // UserID present in note === userID in the req.body
        const note = await NoteModel.findOne({_id:noteID});
        if(note.userID === req.body.userID){
            await NoteModel.findByIdAndDelete({_id:noteID},req.body);
            res.send({"mssg":`The note with ID: ${noteID} has been deleted.`})
        }else{
            res.send({"mssg":"You're not authorized."})
        }
    }catch(err){
        res.send({err});
    }
})

module.exports = {
    noteRouter
}