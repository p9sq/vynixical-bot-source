const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  guildID: String,
  enabled: String,
});
module.exports = mongoose.model("config", Schema);
