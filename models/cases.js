const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    guildID: String,
    cases: [
        {
            id: Number,
            type: String,
            moderator: String,
            member: String,
            reason: String
        }
    ]
});
module.exports = mongoose.model("cases", Schema);