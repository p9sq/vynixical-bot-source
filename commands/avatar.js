const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const Member = message.mentions.users.last() || message.author;
    const embed = new Discord.MessageEmbed()
        .setTitle(`${Member.username}'s avatar`)
        .setThumbnail(Member.defaultAvatarURL)
        .setImage(Member.avatarURL({size: 2048, dynamic: true, format: "png"}))
        .setDescription(`Formats: [png](${Member.avatarURL({size: 2048, dynamic: true, format: "png"})}) | [jpg](${Member.avatarURL({size: 2048, dynamic: true, format: "jpg"})}) | [webp](${Member.avatarURL({size: 2048, dynamic: true, format: "webp"})})`)
        .setColor(color)
    message.channel.send(embed)
}

module.exports.config = {
    name: "avatar",
    description: "Shows the users avatar",
    usage: "avatar [user]",
    category: "Fun",
    example: "avatar @Wumpus#0001",
    accessableby: "Everyone",
    aliases: ["useravatar", "memberavatar"]
}