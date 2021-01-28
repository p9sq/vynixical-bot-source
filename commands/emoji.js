const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async(bot, message, args) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;

    function Emoji(id) {
        return bot.emojis.cache.get(id).toString()
    }
    message.guild.emojis.cache.forEach(emoji => {
        OverallEmojis++;
        if(emoji.animated) {
            Animated++;
            EmojisAnimated+=Emoji(emoji.id)
        } else {
            EmojiCount++;
            Emojis+=Emoji(emoji.id)
        }
    })
    const embed = new Discord.MessageEmbed()
        .setTitle(`Emojis in ${message.guild.name}`)
        .setColor(color)
        .setDescription(`Over all emojis: \`${OverallEmojis}\``)
        .setTimestamp()
    if(!EmojisAnimated) {
        embed.addField(`[${Animated}] Animated:`, "None")
    } else {
        embed.addField(`[${Animated}] Animated:`, `${EmojisAnimated}`)
    }
    if(!Emojis) {
        embed.addField(`[${EmojiCount}] Regular:`, "None")
    } else {
        embed.addField(`[${EmojiCount}] Regular:`, `${EmojiCount}`)
    }
    message.channel.send(embed)
}

module.exports.config = {
    name: "emoji",
    description: "View all emojis in the guild",
    usage: "emoji",
    category: "Fun",
    example: "emoji",
    accessableby: "Everyone",
    aliases: ["emojis"]
}