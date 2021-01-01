const userlevel = require("../models/userlevel");
const config = require("../models/config");
const Discord = require("discord.js");
const canvacord = require("canvacord");
const { color } = require("../botconfig.json");
let num = 50;

module.exports.run = async (bot, message, args) => {
    const Member = message.mentions.users.last() || message.author;
    if(Member.bot) return message.channel.send("The user that you have mentioned is a bot user, bot users have been ignored and won't gain xp or gain a level, please mention a proper user instead of a bot!")
    userlevel.findOne({guildID: message.guild.id, userID: Member.id}, (err, user) => {
    config.findOne({guildID: message.guild.id}, (err, lvl) => {
        if(!lvl) {
            const card = new canvacord.Rank()
            .setUsername(Member.username)
            .renderEmojis(true)
            .setDiscriminator(Member.discriminator)
            .setRank(0)
            .setProgressBar(color, "COLOR")
            .setRankColor(color)
            .setLevelColor(color)
            .setLevel(1)
            .setCurrentXP(0)
            .setRequiredXP(num)
            .setStatus(Member.presence.status)
            .setAvatar(Member.displayAvatarURL({format: "png", size: 1024, dynamic: false}))
        
            card.build().then(data => {
                return message.channel.send("Leveling is currently disabled, do `.enablelevel` to enable the leveling system!", new Discord.MessageAttachment(data, "rank.png"))
            })
        } else {
            if(!user) {
                const card = new canvacord.Rank()
                .setUsername(Member.username)
                .renderEmojis(true)
                .setDiscriminator(Member.discriminator)
                .setRank(0)
                .setProgressBar(color, "COLOR")
                .setRankColor(color)
                .setLevelColor(color)
                .setLevel(1)
                .setCurrentXP(0)
                .setRequiredXP(num)
                .setStatus(Member.presence.status)
                .setAvatar(Member.displayAvatarURL({format: "png", size: 1024, dynamic: false}))
        
                card.build().then(data => {
                    return message.channel.send(new Discord.MessageAttachment(data, "rank.png"))
                })
            } else {
                let diff = ((user.level ? user.level : 1) * num) - user.xp;
                const card = new canvacord.Rank()
                .setUsername(Member.username)
                .renderEmojis(true)
                .setDiscriminator(Member.discriminator)
                .setRank(0)
                .setProgressBar(color, "COLOR")
                .setRankColor(color)
                .setLevelColor(color)
                .setLevel(user.level)
                .setCurrentXP(user.xp)
                .setRequiredXP(diff)
                .setStatus(Member.presence.status)
                .setAvatar(Member.displayAvatarURL({format: "png", size: 1024, dynamic: false}))
        
                card.build().then(data => {
                    return message.channel.send(new Discord.MessageAttachment(data, "rank.png"))
                })
            }
        }
    })
    })
}

module.exports.config = {
    name: "rank",
    description: "Shows your rank",
    usage: "rank [user]",
    category: "Economy",
    example: "rank",
    accessableby: "Everyone",
    aliases: []
}