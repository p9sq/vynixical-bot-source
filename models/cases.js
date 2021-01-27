const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    guildID: String,
    cases: Array
});
module.exports = mongoose.model("cases", Schema);