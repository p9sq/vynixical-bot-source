const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send("Uknown parameter. Please choose the method first, either `decode` or `encode` it");

    let choice = ["encode", "decode"];
    if(!choice.includes(args[0].toLowerCase())) return message.channel.send("Uknown parameter. Please choose the method first, either `decode` or `encode` it");

    let text = args.slice(1).join(" ");

    if(!text) return message.channel.send("Please provide some text");

    if(text.length > 1024) return message.channel.send("Your text is to long. The maximum amount of characters is `1,024`");

    if(args[0].toLowerCase() === "encode") {
        let encodeEmbed = new Discord.MessageEmbed()
        .setTitle("Text to Binary")
        .setDescription(bot.utils.encode(text))
        .setColor(color)
        return message.channel.send(encodeEmbed);
    } else if(args[0].toLowerCase() === "decode") {
        let decodeEmbed = new Discord.MessageEmbed()
        .setTitle("Binary to Text")
        .setDescription(bot.utils.decode(text))
        .setColor(color)
        return message.channel.send(decodeEmbed);
    }
}

module.exports.config = {
    name: "binary",
    description: "Converts text to binary",
    usage: "binary <encode - decode> <text>",
    category: "Fun",
    example: "binary encode who doesn't like binary code?",
    accessableby: "Everyone",
    aliases: ["textbinary", "binarytext"]
}