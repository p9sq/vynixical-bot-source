const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    guildID: String,
    chanID: String,
});
module.exports = mongoose.model("leavechannel", Schema);