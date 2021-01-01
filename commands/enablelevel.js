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
        config.findOne({ guildID: message.guild.id} , (err, lvl) => {
            if(!lvl) {
                const newConfig = new config({
                    guildID: message.guild.id,
                    enabled: "true"
                })
                newConfig.save();
                message.channel.send("<:allow:793205689753010217> **Successfully enabled the levelling system**")
            } else {
                message.channel.send("<:maybe:793205689153093702> **Levelling messages are already enabled**")
            }
        })
    }
}

module.exports.config = {
    name: "enablelevel",
    description: "Enables the levelling system",
    usage: "enablelevel",
    category: "Config",
    example: "enablelevel",
    accessableby: "Admins",
    aliases: ["levelenable"]
}