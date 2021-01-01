const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${bot.user.username} server count`, bot.user.displayAvatarURL({format: "png"}))
    embed.addField("Total Servers:", bot.guilds.cache.size.toLocaleString())
    embed.setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
    embed.setColor(color)
    embed.setTimestamp()
    message.channel.send(embed)
}

module.exports.config = {
    name: "servers",
    description: "Shows how much servers the bot is in",
    usage: "servers",
    category: "Info",
    example: "servers",
    accessableby: "Everyone",
    aliases: []
}