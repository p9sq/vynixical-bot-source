const modlogs = require("../models/logchannel");
const Discord = require("discord.js");

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    const snipes = bot.snipes.get(message.channel.id) || [];
    snipes.unshift({
        content: message.content,
        author: message.author,
        attachment: message.attachments.first() ? message.attachments.first().proxyURL : null,
        date: new Date().toLocaleString("en-GB", { dataStyle: "full", timeStyle: "short"})
    })
    snipes.splice(10);
    bot.snipes.set(message.channel.id, snipes)
    if(message.mentions.users.size > 0 || message.mentions.roles.size > 0) {
        let embed = new Discord.MessageEmbed()
        modlogs.findOne({guildID: message.guild.id}, (err, ch) => {
        embed.setTitle("Ghost ping detected")
        embed.setThumbnail(message.author.displayAvatarURL({format: "png", dynamic: true, size: 2048}))
        embed.setColor("GREEN")
        embed.addField("User:", message.author)
        embed.addField("Content:", message.content)
        embed.setFooter(`Date: ${message.createdAt.toLocaleString()}`)
        bot.channels.cache.get(ch.channelID).send(embed)
        })
      }
}