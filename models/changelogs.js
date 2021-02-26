const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  changeLog: String,
  date: String,
  version: String,
});
module.exports = mongoose.model("change-logs", Schema);
