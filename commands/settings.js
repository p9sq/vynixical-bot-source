const Discord = require("discord.js");
const modlogs = require("../models/logchannel");
const mutedRole = require("../models/mute");
const guildprefix = require("../models/prefix");
const memberRole = require("../models/memberrole");
const welchannel = require("../models/welchannel");
const weltxt = require("../models/welcometext");
const leavetxt = require("../models/leavetext");
const leavechannel = require("../models/leavechannel");
const config = require("../models/config");
const antiswear = require("../models/antiswear");
const lvlch = require("../models/lvlchannel");
const { color, owners } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    embed.setTitle("Bot Settings")
    embed.setDescription(`${bot.user.username} settings for ${message.guild.name}`)
    embed.setThumbnail(message.guild.iconURL({size: 2048, dynamic: true, format: "png"}))
    embed.setFooter(`${bot.users.cache.get(owners[0]).tag} was here - 29/12/2020`)
    embed.setColor(color)
        guildprefix.findOne({guildID: message.guild.id}, (err, data) => {
            embed.addField("Prefix:", `\`${data.prefix}\``)
            mutedRole.findOne({guildID: message.guild.id}, (err, m) => {
                if(!m) {
                    embed.addField("Muted Role:", "`No muted role`")
                } else {
                    embed.addField("Muted Role:", `\`${message.guild.roles.cache.get(m.muteID).name}\``)
                }
                modlogs.findOne({guildID: message.guild.id}, (err, ch) => {
                    if(!ch) {
                        embed.addField("Logger channel:", "`No logger channel`")
                    } else {
                        embed.addField("Logger channel:", `\`${message.guild.channels.cache.get(ch.channelID).name}\``) 
                    }
                    memberRole.findOne({guildID: message.guild.id}, (err, mr) => {
                        if(!mr) {
                            embed.addField("Member role:", "`No member role`")
                        } else {
                            embed.addField("Member role:", `\`${message.guild.roles.cache.get(mr.roleID).name}\``) 
                        }
                        welchannel.findOne({guildID: message.guild.id}, (err, w) => {
                            if(!w) {
                                embed.addField("Welcome channel:", "`No welcome channel`")
                            } else {
                                embed.addField("Welcome channel:", `\`${message.guild.channels.cache.get(w.chID).name}\``) 
                            }
                            leavechannel.findOne({guildID: message.guild.id}, (err, lc) => {
                                if(!lc) {
                                    embed.addField("Leave channel:", "`No leave channel`")
                                } else {
                                    embed.addField("Leave channel:", `\`${message.guild.channels.cache.get(lc.chanID).name}\``) 
                                }
                                weltxt.findOne({guildID: message.guild.id}, (err, wt) => {
                                    if(!wt) {
                                        embed.addField("Welcome message:", "`Welcome **{member}**, you are member number **{memberCount}**! I hope you have a great time in **{guild}**!` (Default)")
                                    } else {
                                        embed.addField("Welcome message:", `\`${wt.msg}\``) 
                                    }
                                    leavetxt.findOne({guildID: message.guild.id}, (err, lt) => {
                                        if(!lt) {
                                            embed.addField("Leave message:", "`**{member}** has just left **{guild}**!` (Default)")
                                        } else {
                                            embed.addField("Leave message:", `\`${lt.msg}\``)
                                        }
                                    config.findOne({guildID: message.guild.id}, (err, lvl) => {
                                        if(!lvl) {
                                            embed.addField("Leveling:", "`No` (Default)")
                                        } else {
                                            embed.addField("Leveling:", "`Yes`")
                                        }
                                        antiswear.findOne({guildID: message.guild.id}, (err, anti) => {
                                            if(!anti) {
                                                embed.addField("Anti-Swear:", "`No` (Default)")
                                            } else {
                                                embed.addField("Anti-Swear:", "`Yes`")
                                            }
                                            lvlch.findOne({guildID: message.guild.id}, (err, levelch) => {
                                                if(!levelch) {
                                                    embed.addField("Level channel:", "`Current channel` (Default)")
                                                } else {
                                                    embed.addField("Level channel:", `\`${message.guild.channels.cache.get(levelch.channelID).name}\``)
                                                }
                                                message.channel.send(embed)
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

module.exports.config = {
    name: "settings",
    description: "Shows the bots settings",
    usage: "settings",
    category: "Info",
    example: "settings",
    accessableby: "Everyone",
    aliases: ["dbstats", "databasestats", "statsdb"]
}