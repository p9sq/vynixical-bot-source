const Discord = require("discord.js");
const moment = require("moment");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const emoji = args[0];
    if(!emoji) return message.channel.send("Please specify an emoji to get info on.");
    const parsedEmoji = Discord.Util.parseEmoji(emoji);
    const emojiInfo = message.guild.emojis.cache.get(parsedEmoji.id);
    const embed = new Discord.MessageEmbed()
        .setTitle(`${emojiInfo.name} info`)
        .setThumbnail(emojiInfo.url)
        .setColor(color)
        .addField("Name:", emojiInfo.name, true)
        .addField("ID:", emojiInfo.id, true)
        .addField("Animated", emojiInfo.animated ? "Yes" : "No", true)
        .addField("Emoji Created:", `${moment(emojiInfo.createdAt).format("MMMM Do YYYY, h:mm A")} | ${moment(emojiInfo.createdAt).startOf().fromNow()}`, true)
        .addField("URL:", emojiInfo.url, true)
        .setFooter("Emoji Info", emojiInfo.url)
        .setTimestamp()
        if(emojiInfo.animated) {
            embed.addField("Indentifier:", `\`<a:${emojiInfo.name}:${emojiInfo.id}>\``)
        } else {
            embed.addField("Indentifier:", `\`<:${emojiInfo.name}:${emojiInfo.id}>\``)
        }
    message.channel.send(embed);
}

module.exports.config = {
    name: "emojiinfo",
    description: "Shows the emoji",
    usage: "emojiinfo <emoji>",
    category: "Info",
    example: "emojiinfo <:allow:799843005678616586>",
    accessableby: "Everyone",
    aliases: ["emoji"]
}