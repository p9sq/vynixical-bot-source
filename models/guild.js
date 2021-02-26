const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  guildID: String,
  antiswear: Boolean,
  muteRole: String,
  prefix: String,
  logChannel: String,
  autoResponse: {
    message: String,
    response: String,
  },
  giveaways: {
    messageID: { type: String, required: true },
    channelID: { type: String, required: true },
    title: { type: String, required: true },
    prize: { type: String, required: true },
    winners: { type: Number, required: true },
    createdOn: { type: Date, required: true },
    endsOn: { type: Date, required: true },
    duration: { type: String, required: true },
  },
  welcome: {
    text: String,
    image: Boolean,
    channel: String,
    role: String,
  },
  leave: {
    text: String,
    channel: String,
  },
  levels: {
    enabled: Boolean,
    channel: String,
  },
  userXp: {
    userID: String,
    balance: { type: Number, default: 0 },
  },
  warns: {
    userID: String,
    warns: Array,
  },
});
module.exports = mongoose.model("guilds", Schema);
