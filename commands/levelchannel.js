const lvlch = require("../models/lvlchannel");
const config = require("../models/config");
const guildprefix = require("../models/prefix");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL())
        message.channel.send(embed)
    } else {
        guildprefix.findOne({guildID: message.guild.id, guildOwner: message.guild.owner.user.tag, guildName: message.guild.name}, (err, gp) => {
            config.findOne({guildID: message.guild.id}, (err, lvl) => {
                if(!lvl) {
                    return message.channel.send(`<:deny:793205689488900136> **The leveling system is currently disabled, do \`${gp.prefix}enablelevel\` then \`${gp.prefix}levelchannel #channel\`**`)
                } else {
                    const channel = message.mentions.channels.last()
                    if(!channel) return message.channel.send("<:maybe:793205689153093702> **Please mention a channel**")
                    lvlch.findOne({guildID: message.guild.id}, (err, data) => {
                    if(!data){
                        const newLevelChannel = lvlch({
                            guildID: message.guild.id,
                            channelID: channel.id
                        })
                        newLevelChannel.save();
                        message.channel.send(`<:allow:793205689753010217> **Successfully set the level channel to ${channel.name}**`)
                    }else {
                        data.channelID = channel.id
                        data.save()
                        message.channel.send(`<:allow:793205689753010217> **Successfully set the level channel to ${channel.name}**`)
                    }
                })
                }
            })
        })
    }
}

module.exports.config = {
    name: "levelchannel",
    description: "Sets the leveling messages to go to a certian channel",
    usage: "levelchannel <channel>",
    category: "Config",
    example: "levelchannel #levels",
    accessableby: "Admins",
    aliases: ["levelset"]
}