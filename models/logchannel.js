const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  guildID: String,
  channelID: String,
});
module.exports = mongoose.model("modlogs", Schema);
