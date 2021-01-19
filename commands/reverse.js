const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!args.join(" ")) return message.channel.send("Please provide some text!")
    const txt = args.join(" ").split("").reverse().join("")
    const embed = new Discord.MessageEmbed()
    embed.setColor(color)
    embed.addField("Reversed Text", `\`\`\`${txt}\`\`\``)
    message.channel.send(embed)
}

module.exports.config = {
    name: "reverse",
    description: "Reverses your text",
    usage: "reverse <text>",
    category: "Fun",
    example: "reverse Hello World",
    accessableby: "Everyone",
    aliases: ["r", "reversetext"]
}