const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.last() || bot.users.cache.get(args[0]) || message.author;
    let triggered = await canvacord.Canvas.trigger(user.displayAvatarURL({format: "png", dynamic: false}));
    const img = new Discord.MessageAttachment(triggered, "triggered.gif");
    return message.channel.send(img);
}

module.exports.config = {
    name: "trigger",
    description: "Turns your discord avatar to a triggered gif",
    usage: "trigger [user]",
    category: "Image",
    example: "trigger @Wumpus#0001",
    accessableby: "Everyone",
    aliases: []
}