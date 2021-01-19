const weltxt = require("../models/welcometext");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL())
        message.channel.send(embed)
    } else {
            const msg = args.join(" ")
            if(!msg) return message.channel.send("Please provide a message!")
            weltxt.findOne({ guildID: message.guild.id } , ( err , wt ) => {
                if(!wt){
                    const newMSG = weltxt({
                        guildID: message.guild.id,
                        msg: msg
                    })
                    newMSG.save();
                    message.channel.send(`<:allow:793205689753010217> **Successfully set the welcome message to ${msg}**`)
                }else {
                    wt.msg = msg
                    wt.save()
                    message.channel.send(`<:allow:793205689753010217> **Successfully set the welcome message to ${msg}**`)
                }
            })
    }
}

module.exports.config = {
    name: "welmsg",
    description: "Sets the welcome text for the server",
    usage: "welmsg <message>",
    category: "Config",
    example: "welmsg Hey there, welcome to the server, please go to #rules to read all rules to never be punished!",
    accessableby: "Admins",
    aliases: ["welcomemessage", "welcomemsg"]
}