const Discord = require("discord.js");
const superagent = require("superagent");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const {body} = await superagent.get(`https://some-random-api.ml/animu/pat`)
    if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
    const user = message.mentions.users.last();
    if(!user) return message.channel.send("Please mention a user!")
    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(`${message.author} pats ${user}`)
        .setImage(body.link)
    message.channel.send(embed);
}

module.exports.config = {
    name: "pat",
    description: "Sends a random anime patting gif",
    usage: "pat <user>",
    category: "Fun",
    example: "pat @Wumpus#0001",
    accessableby: "Everyone",
    aliases: []
}