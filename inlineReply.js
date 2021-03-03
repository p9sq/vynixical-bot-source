const { APIMessage, Structures } = require("discord.js");

class Message extends Structures.get("Message") {
    async inlineReply(content, options) {
        const mentionRepliedUser = typeof ((options || content|| {}).allowedMentions || {}).repliedUser === "undefined" ? true : ((options || content).allowedMentions).repliedUser;
        delete ((options || content|| {}).allowedMentions || {}).repliedUser;

        const apiMessage = content instanceof APIMessage ? content.resolve() : APIMessage.create(this.channel, content, options).resolveData();
        Object.assign(apiMessage.data, {message_reference: {message_id: this.id}});

        if(!apiMessage.data.allowed_mentions || Object.keys(apiMessage.data.allowed_mentions).length === 0) {
            apiMessage.data.allowed_mentions = { parse: ["users", "roles", "everyone"] };
        }

        if(typeof apiMessage.data.allowed_mentions.replied_user === "undefined") {
            Object.assign(apiMessage.data.allowed_mentions, {replied_user: mentionRepliedUser});
        }
    }
}

Structures.extend("Message", () => Message);