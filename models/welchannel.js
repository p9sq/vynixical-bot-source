const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  guildID: String,
  chID: String,
});
module.exports = mongoose.model("welcomechannel", Schema);
