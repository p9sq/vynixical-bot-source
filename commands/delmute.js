const mutedRole = require("../models/mute");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL())
        message.channel.send(embed)
    } else{
            mutedRole.findOneAndDelete({guildID: message.guild.id}, (err, m) => {
                message.channel.send(`<:allow:793205689753010217> **Successfully removed the ${message.guild.roles.cache.get(m.muteID).name} role from ${message.guild.name}**`)
            })
        }
    }

module.exports.config = {
    name: "disablemute",
    description: "Disables the muted role",
    usage: "disablemute",
    category: "Config",
    example: "disablemute",
    accessableby: "Admins",
    aliases: ["resetmute", "removemute"]
}