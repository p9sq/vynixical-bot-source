const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  guildID: String,
  muteID: String,
});
module.exports = mongoose.model("muterole", Schema);
