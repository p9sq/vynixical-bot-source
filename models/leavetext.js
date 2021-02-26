const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  guildID: String,
  msg: String,
});
module.exports = mongoose.model("leavetxt", Schema);
