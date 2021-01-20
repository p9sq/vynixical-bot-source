const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    guildID: String,
    antiswear: Boolean,
    autoResponse: {
        msg: String,
        response: String
    },
    levelEnabled: Boolean,
    giveaways: {
        guildId: { type: String, required: true },
        messageId: { type: String, required: true },
        channelId: { type: String, required: true },
        title: { type: String, required: true },
        prize: { type: String, required: true },
        winners: { type: Number, required: true },
        createdOn: { type: Date, required: true },
        endsOn: { type: Date, required: true },
        duration: { type: String, required: true }
    },
    welimg: Boolean,
    leaveChannel: String,
    leaveText: String,
    logChannel: String,
    levelChannel: String,
    memberRole: String,
    muteRole: String,
    prefix: String,
    userXp: {
        userID: String,
        balance: { type: Number, default: 0 }
    },
    warns: {
        userID: String,
        warns: Array
    },
    welcomeChannel: String,
    welcomeText: String
});
module.exports = mongoose.model("guilds", Schema);