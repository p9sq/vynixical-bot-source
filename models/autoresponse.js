const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    guildID: String,
    msg: String,
    response: String
});
module.exports = mongoose.model("auto-responses", Schema);