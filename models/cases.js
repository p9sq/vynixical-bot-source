const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    guildID: String,
    cases: [
        {
            caseID: Number,
            moderator: String,
            member: String,
            reason: String
        }
    ]
});
module.exports = mongoose.model("cases", Schema);