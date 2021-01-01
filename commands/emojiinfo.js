const Discord = require("discord.js");
const moment = require("moment");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const emoji = message.guild.emojis.cache.get(args[0]) || message.guild.emojis.cache.find(emoji => emoji.name === args[0])
    let txt = "";
    if(emoji.animated) {
        txt = "Yes"
    } else if(!emoji.animated) {
        txt = "No"
    }
    if(!emoji) return message.channel.send("Please specify a emoji id or name!")
    let embed = new Discord.MessageEmbed()
    .setTitle(`${emoji.name} info`)
    .setThumbnail(emoji.url)
    .setColor(color)
    .addField("Name:", emoji.name || "None", true)
    .addField("ID:", emoji.id || "None", true)
    .addField("Animated", txt || "None", true)
    .addField("Emoji Created:", moment(emoji.createdAt).format('MMMM Do YYYY, h:mm A') + " | " + moment(emoji.createdAt).startOf().fromNow() || "None", true)
    .addField("URL:", "<" + emoji.url + ">" || "None", true)
    if(emoji.animated) {
        embed.addField("Indentifier:", "`<a:" + emoji.name + ":" + emoji.id + ">`" || "None")
    } else {
        embed.addField("Indentifier:", "`<:" + emoji.name + ":" + emoji.id + ">`" || "None")
    }
    embed.setFooter("Emoji Info", emoji.url)
    embed.setTimestamp()
    message.channel.send(embed);
}

module.exports.config = {
    name: "emojiinfo",
    description: "Shows the emojis info by id",
    usage: "emojiinfo <emoji-id | emoji-name>",
    category: "Info",
    example: "emojiinfo 704484542248911075",
    accessableby: "Everyone",
    aliases: ["emoji"]
}