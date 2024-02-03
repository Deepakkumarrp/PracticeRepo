const mongoose = require("mongoose");


const main = async() => {
    try{
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/b33mongoose");
        console.log("connected to the DB.")
        UserModel.insertMany([{name:"Chunnu",age:34,isMarried:true,city:"Pune"}])
        console.log("Data has been added.")
    }catch(e){
        console.log(e);
    }
}

main();

// Structuring of DB

// 1.Schema

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    isMarried: Boolean,
    city: String
},{
    versionKey: false,
})

// 2.Model

const UserModel = mongoose.model("user",userSchema); 