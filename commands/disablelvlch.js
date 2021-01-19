const lvlch = require("../models/lvlchannel");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
        message.channel.send(embed)
    } else {
        lvlch.findOneAndDelete({guildID: message.guild.id} , (err, data) => {
            if(!data) {
                message.channel.send("The leveling channel is set to the current channel by default!")
            } else {
                message.channel.send("<:allow:793205689753010217> **Successfully disabled the level channel system**")
            }
        })
    }
}

module.exports.config = {
    name: "disablelvlch",
    description: "Disables the levelling channel",
    usage: "disablelvlch",
    category: "Config",
    example: "disablelvlch",
    accessableby: "Admins",
    aliases: []
}