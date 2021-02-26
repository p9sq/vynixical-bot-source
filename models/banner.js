const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  image: String,
});
module.exports = mongoose.model("banner", Schema);
