const Discord = require("discord.js");
const weltxt = require("../models/welcometext");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        let embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
        message.channel.send(embed)
    } else {
        weltxt.findOneAndDelete({guildID: message.guild.id} , (err, wt) => {
                message.channel.send("<:allow:793205689753010217> **Successfully reset the welcome message back to** `Welcome **{member}**, you are member number **{memberCount}**! I hope you have a great time in **{guild}**!`")
        })
    }
}

module.exports.config = {
    name: "disableweltxt",
    description: "Disables the welcome text",
    usage: "disableweltxt",
    category: "Config",
    example: "disableweltxt",
    accessableby: "Admins",
    aliases: []
}