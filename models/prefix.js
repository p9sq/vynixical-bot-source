const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    guildID: String,
    guildOwner: String,
    guildName: String,
    prefix: String,
});
module.exports = mongoose.model("prefix", Schema);