const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let Member = message.mentions.users.first() || message.author;
    let num = Math.floor(Math.random() * 99) + 1;
    let embed = new Discord.MessageEmbed()
    if(num === 100) {
      embed.setColor("GREEN")
    } else {
      embed.setColor("RANDOM")
    }
    embed.setTitle("Gay rate Machine!")
    embed.setDescription(`${Member.username} is ${num}% gay 🏳️‍🌈`)
    message.channel.send(embed);
}

module.exports.config = {
    name: "howgay",
    description: "Shows how gay the user/member is",
    usage: "howgay [user]",
    category: "Fun",
    example: "howgay @Wumpus#0001",
    accessableby: "Everyone",
    aliases: ["howgayis"]
}