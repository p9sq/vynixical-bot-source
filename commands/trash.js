const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (bot, message, args) => {
        let user = message.mentions.users.last() || message.author;
        let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
        let image = await canvacord.Canvas.trash(avatar);
        const img = new Discord.MessageAttachment(image, "trash.png")
        message.channel.send(img);

}

module.exports.config = {
    name: "trash",
    description: "Your Trash",
    usage: "trash [user]",
    category: "Image",
    example: "trash",
    accessableby: "Everyone",
    aliases: []
}