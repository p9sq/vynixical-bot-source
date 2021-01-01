const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    const {body} = await superagent.get(`https://some-random-api.ml/img/fox`)
    if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
    const img = new Discord.MessageAttachment(body.link)
    message.channel.send(img);
}

module.exports.config = {
    name: "fox",
    description: "Shows a random fox image",
    usage: "fox",
    category: "Animals",
    example: "fox",
    accessableby: "Everyone",
    aliases: []
}