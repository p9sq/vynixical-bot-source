const warns = require("../models/warns");
const Discord = require("discord.js");
const modlogs = require("../models/logchannel");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const invalidEmbed = new Discord.MessageEmbed()
            .setTitle("Invalid Permissions!")
            .addField("Permissions Required:", "Administrator")
            .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
        message.channel.send(invalidEmbed);
    } else {
        const user = message.mentions.users.last();
        if(!user) return message.channel.send("<:maybe:793205689153093702> **You didn't mention a user to reset their warns**")
        warns.findOneAndDelete({ Guild: message.guild.id, User: user.id}, (err, res) => {
            if(err) console.error(err)
            message.channel.send(`<:allow:793205689753010217> **Successfully reset all warns from ${user.tag}**`)
            const embed = new Discord.MessageEmbed()
            modlogs.findOne({ guildID: message.guild.id } , ( err , ch ) => {
                embed.setTitle("A users warns have been reset")
                embed.addField("User:", user.tag)
                embed.addField("Moderator:", message.author.tag)
                embed.setFooter(bot.user.username, bot.user.displayAvatarURL())
                embed.setTimestamp()
                if(!ch) {
                    return;
                  } else {
                    const logschannel = message.guild.channels.cache.get(ch.channelID)
                    logschannel.send(embed)
                  }
            })
        })
    }
}

module.exports.config = {
    name: "resetwarns",
    description: "Resets the mentioned users warns",
    usage: "resetwarns <user>",
    category: "Config",
    example: "resetwarns @Wumpus#0001",
    accessableby: "Admins",
    aliases: ["deletewarns", "delwarns"]
}