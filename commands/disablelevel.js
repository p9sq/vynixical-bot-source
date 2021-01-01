const config = require("../models/config");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
        message.channel.send(embed)
    } else {
        config.findOneAndDelete({guildID: message.guild.id} , (err, lvl) => {
            if(!lvl) {
                message.channel.send("Levelling is off by default!")
            } else {
                message.channel.send("<:allow:793205689753010217> **Successfully disabled the levelling system**")
            }
        })
    }
}

module.exports.config = {
    name: "disablelevel",
    description: "Disables the levelling system",
    usage: "disablelevel",
    category: "Config",
    example: "disablelevel",
    accessableby: "Admins",
    aliases: ["leveldisable"]
}