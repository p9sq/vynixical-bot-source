const mongoose = require('mongoose');
const warnSchema = mongoose.Schema({
    Warns: Array,
    User: String,
    Guild: String
});
module.exports = mongoose.model("warns", warnSchema)