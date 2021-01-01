const leavechannel = require("../models/leavechannel");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL())
        message.channel.send(embed)
    } else {
            const channel = message.mentions.channels.first()
            if(!channel) return message.reply("Please mention a channel!")
            leavechannel.findOne({ guildID: message.guild.id } , ( err , lc ) => {
                if(!lc){
                    let newChannel = leavechannel({
                        guildID: message.guild.id,
                        chanID: channel.id
                    })
                    newChannel.save();
                    message.channel.send(`<:allow:793205689753010217> **Successfully set the leave channel to ${channel.name}**`)
                }else {
                    lc.chanID = channel.id
                    lc.save()
                    message.channel.send(`<:allow:793205689753010217> Successfully set the leave channel to **${channel.name}**`)
                }
            })
    }
}

module.exports.config = {
    name: "leavechannel",
    description: "Sets the leave channel for the server",
    usage: "leavechannel <channel>",
    category: "Config",
    example: "leavechannel #leave-channel",
    accessableby: "Admins",
    aliases: ["setleave", "leavech"]
}