const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  guildID: String,
  roleID: String,
});
module.exports = mongoose.model("memberrole", Schema);
