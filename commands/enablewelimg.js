const img = require("../models/img");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
        message.channel.send(embed)
    } else {
        img.findOne({ guildID: message.guild.id} , (err, image) => {
            if(!image) {
                const newConfig = new img({
                    guildID: message.guild.id,
                    enabled: "true"
                })
                newConfig.save();
                message.channel.send("<:allow:793205689753010217> **Successfully enabled the welcome image**")
            } else {
                message.channel.send("<:maybe:793205689153093702> **Welcome image is already enabled**")
            }
        })
    }
}

module.exports.config = {
    name: "enablewelimg",
    description: "Enables the levelling system",
    usage: "enablewelimg",
    category: "Config",
    example: "enablewelimg",
    accessableby: "Admins",
    aliases: ["enablewelcomeimage"]
}