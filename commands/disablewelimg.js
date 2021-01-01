const img = require("../models/img");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
        message.channel.send(embed)
    } else {
        img.findOneAndDelete({guildID: message.guild.id} , (err, image) => {
            if(!image) {
                message.channel.send("<:deny:793205689488900136> **Welcome image is off by default**")
            } else {
                message.channel.send("<:allow:793205689753010217> **Successfully disabled the welcome image**")
            }
        })
    }
}

module.exports.config = {
    name: "disablewelimg",
    description: "Disables the welcome image",
    usage: "disablewelimg",
    category: "Config",
    example: "disablewelimg",
    accessableby: "Admins",
    aliases: ["disablewelcomeimage"]
}