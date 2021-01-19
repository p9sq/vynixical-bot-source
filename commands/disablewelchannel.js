const Discord = require("discord.js");
const welchannel = require("../models/welchannel");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
        message.channel.send(embed)
    } else {
        welchannel.findOneAndDelete({guildID: message.guild.id} , (err, w) => {
                message.channel.send("<:allow:793205689753010217> **Successfully disabled the welcome channel**")
        })
    }
}

module.exports.config = {
    name: "disablewelchannel",
    description: "Disables the welcome channel",
    usage: "disablewelchannel",
    category: "Config",
    example: "disablewelchannel",
    accessableby: "Admins",
    aliases: []
}