const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  userID: String,
  guildID: String,
  balance: { type: Number, default: 0 },
});
module.exports = mongoose.model("credit_tables", Schema);
