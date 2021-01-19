const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const banner = require("../models/banner");

module.exports.run = async (bot, message, args) => {
    if(!botconfig.owners.includes(message.author.id)) {
        message.react("710703782887161898")
        const embed = new Discord.MessageEmbed()
            .setTitle("❌ Access Denied!")
            .setDescription("You aren't the owner of this bot!")
            .setColor("RED")
            .setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
            .setTimestamp()
        message.channel.send(embed)
        } else {
            if(!args[0]) return message.channel.send("<:maybe:793205689153093702> **Please specify a discord attachment url**")
            if(!args[0].startsWith("https://cdn.discordapp.com/")) return message.channel.send("<:maybe:793205689153093702> **That is not a valid discord attachment**")
            banner.findOne({}, (err, img) => {
                if(!img) {
                    const newBanner = banner({
                        image: args[0]
                    })
                    newBanner.save()
                    message.channel.send(`<:allow:793205689753010217> **Successfully set the banner to <${args[0]}>**`)
                } else {
                    img.image = args[0]
                    img.save()
                    message.channel.send(`<:allow:793205689753010217> **Successfully set the banner to <${args[0]}>**`)
                }
            })
        }
}

module.exports.config = {
    name: "setbanner",
    description: "Sets the banner for the botinfo command",
    usage: "setbanner <discord-attachment-url>",
    category: "Developer",
    example: "setbanner https://cdn.discordapp.com/attachments/123456789101112/1211109876543212/NewBotBanner.png",
    accessableby: "Developer",
    aliases: []
}