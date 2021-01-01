const antiswear = require("../models/antiswear");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
        message.channel.send(embed)
    } else {
        antiswear.findOneAndDelete({guildID: message.guild.id} , (err, anti) => {
            message.channel.send(`<:allow:793205689753010217> **Successfully disabled anti-swearing**`)
        })
    }
}

module.exports.config = {
    name: "unantiswear",
    description: "Disables anti-swear for the server",
    usage: "unantiswear",
    category: "Config",
    example: "unantiswear",
    accessableby: "Admins",
    aliases: []
}