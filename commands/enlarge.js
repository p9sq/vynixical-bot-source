const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports.run = async (bot, message, args) => {
    const emoji = args[0]
    if(!emoji) return message.channel.send("Please specify a emoji!")

    let custom = Discord.Util.parseEmoji(emoji);
    let embed = new Discord.MessageEmbed()
    .setTitle(`Enlarged version of ${emoji}`)
    .setColor("#FFFF00")

    if (custom.id) {
        embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
        return message.channel.send(embed);
    }
    else {
        let parsed = parse(emoji, { assetType: "png" });
        if (!parsed[0]) return message.channel.send("Invalid emoji!");

        embed.setImage(parsed[0].url);
        return message.channel.send(embed);
    }
}

module.exports.config = {
    name: "enlarge",
    description: "Enlarge a emoji",
    usage: "enlarge [emoji]",
    category: "Image",
    example: "enlarge :smile:",
    accessableby: "Everyone",
    aliases: []
}