const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  banner: String,
  changeLogs: {
    changeLog: String,
    date: String,
    version: String,
  },
});
module.exports = mongoose.model("bot", Schema);
