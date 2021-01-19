const Discord = require("discord.js");
const superagent = require("superagent");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const {body} = await superagent.get(`https://some-random-api.ml/animu/hug`)
    if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
    const user = message.mentions.users.last();
    if(!user) return message.channel.send("Please mention a user!")
    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(`${message.author} hugs ${user}`)
        .setImage(body.link)
    message.channel.send(embed);
}

module.exports.config = {
    name: "hug",
    description: "Sends a random anime hugging gif",
    usage: "hug <user>",
    category: "Fun",
    example: "hug @Wumpus#0001",
    accessableby: "Everyone",
    aliases: []
}