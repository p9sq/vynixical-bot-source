const Discord = require("discord.js");
const superagent = require("superagent");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send("Uknown parameter. Please choose the method first, either decode or encode it");
        const method = ["encode", "decode"];
        if(!method.includes(args[0].toLowerCase())) return message.channel.send("Uknown parameter. Please choose the method first, either decode or encode it");
        const msg = args.slice(1).join(" ");
        if(!msg) return message.channel.send("Please provide some text");
        if(msg.length > 1024) return message.channel.send("Your text is to long. The maximum amount of characters is `1,024`");
        if(args[0].toLowerCase() === method[0]) {
            const {body} = await superagent.get(`https://some-random-api.ml/base64?encode=${msg}`)
            const embed = new Discord.MessageEmbed()
                .setTitle("Text to Base64")
                .setColor(color)
                .setDescription(body.base64)
            return message.channel.send(embed);
        } else if(args[0].toLowerCase() === method[1]) {
            const {body} = await superagent.get(`https://some-random-api.ml/base64?decode=${msg}`)
            const embed = new Discord.MessageEmbed()
                .setTitle("Base64 to Text")
                .setDescription(body.text)
                .setColor(color)
            return message.channel.send(embed);
        }
}

module.exports.config = {
    name: "base64",
    description: "Converts text to base64",
    usage: "base64 <encode - decode> <text>",
    category: "Fun",
    example: "base64 encode who doesn't like base64",
    accessableby: "Everyone",
    aliases: ["textbase64", "base64text"]
}