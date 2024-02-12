const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
    blacklistToken : {
        type: String,
        required: true
    }
},{
    versionKey : false
})

const BlacklistToken = mongoose.model("blacklistToken",blacklistSchema);

module.exports = {
    BlacklistToken
}