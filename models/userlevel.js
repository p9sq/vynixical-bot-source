const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  guildID: String,
  userID: String,
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
});
module.exports = mongoose.model("levels", Schema);
