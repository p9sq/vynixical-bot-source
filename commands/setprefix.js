const guildprefix = require("../models/prefix");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
        message.channel.send(embed)
    } else {
        if(!args.join(" ")) {
            const embed = new Discord.MessageEmbed()
            guildprefix.findOne({guildID: message.guild.id}, (err, data) => {
                embed.setTitle("Invalid Usage")
                embed.addField("Correct Usage:", `${data.prefix}setprefix <prefix>\nDon't include the \`<>\``)
                embed.setFooter(bot.user.username + " | Prefix command", bot.user.displayAvatarURL({format: "png"}))
                message.channel.send(embed)
            })
        } else {
            guildprefix.findOne({guildID: message.guild.id}, (err, data) => {
                data.prefix = args.join(" ")
                data.save()
            })
            message.channel.send(`<:allow:793205689753010217> **Successfully set the prefix to ${args.join(" ")}**`)
        }
    }
}

module.exports.config = {
    name: "setprefix",
    description: "Sets the prefix for the server",
    usage: "setprefix <prefix>",
    category: "Config",
    example: "setprefix !",
    accessableby: "Admins",
    aliases: ["changeprefix", "prefixchange"]
}