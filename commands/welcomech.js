const welchannel = require("../models/welchannel");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL())
        message.channel.send(embed)
    } else {
            const channel = message.mentions.channels.first()
            if(!channel) return message.channel.send("Please mention a channel!")
            welchannel.findOne({ guildID: message.guild.id } , ( err , w ) => {
                if(!w){
                    const newChannel = welchannel({
                        guildID: message.guild.id,
                        chID: channel.id
                    })
                    newChannel.save();
                    message.channel.send(`<:allow:793205689753010217> **Successfully set the welcome channel to ${channel.name}**`)
                }else {
                    w.chID = channel.id
                    w.save()
                    message.channel.send(`<:allow:793205689753010217> **Successfully set the welcome channel to ${channel.name}**`)
                }
            })
    }
}

module.exports.config = {
    name: "welchannel",
    description: "Sets the welcome channel for the server",
    usage: "welchannel <channel>",
    category: "Config",
    example: "welchannel #welcome-channel",
    accessableby: "Admins",
    aliases: ["setwelcome", "welcomechannel"]
}