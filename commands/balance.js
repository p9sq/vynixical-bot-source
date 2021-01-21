const users = require("../models/users");
const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({format: "png"}))
        .setTitle("Your Wallet")
        .setColor(color);
    users.findOne({userID: message.author.id, guildID: message.guild.id}, (err, member) => {
        if(member) {
            embed.addField("Money:", `<:vynixical_coin:801956380965732362> ${member.balance.toLocaleString()}`);
        } else {
            embed.addField("Money:", "<:vynixical_coin:801956380965732362> 0");
        }
        message.channel.send(embed)
})
}

module.exports.config = {
    name: "bal",
    description: "Shows your current money",
    usage: "bal",
    category: "Economy",
    example: "bal",
    accessableby: "Everyone",
    aliases: ["balance"]
}