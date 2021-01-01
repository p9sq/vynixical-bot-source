const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (bot, message, args) => {
        let user = message.mentions.users.last() || message.author;
        let avatar = user.displayAvatarURL({dynamic: false, format: "png", size: 2048});
        let image = await canvacord.Canvas.rainbow(avatar);
        const img = new Discord.MessageAttachment(image, "gay.png")
        message.channel.send(img);
}

module.exports.config = {
    name: "gay",
    description: "Makes your avatar a pride flag",
    usage: "gay [user]",
    category: "Image",
    example: "gay",
    accessableby: "Everyone",
    aliases: []
}