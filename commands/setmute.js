const mutedRole = require("../models/mute");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
        embed.setTitle("Invalid Permissions!")
        embed.addField("Permissions Required:", "Manage Guild")
        embed.setFooter(bot.user.username, bot.user.displayAvatarURL())
        message.channel.send(embed)
    } else {
        
            const role = message.mentions.roles.last()
            if(!role) return message.channel.send("Please mention a role!")
            mutedRole.findOne({ guildID: message.guild.id } , ( err , m ) => {
                if(!m){
                    const newMute = mutedRole({
                        guildID: message.guild.id,
                        muteID: role.id
                    })
                    newMute.save();
                    message.channel.send(`<:allow:793205689753010217> **Successfully set the muted role to ${role.name}**`)
                }else {
                    m.muteID = role.id
                    m.save()
                    message.channel.send(`<:allow:793205689753010217> **Successfully set the muted role to ${role.name}**`)
                }
            })
    }
}

module.exports.config = {
    name: "setmute",
    description: "Sets the mute role for the server",
    usage: "setmute <role>",
    category: "Config",
    example: "setmute @Muted",
    accessableby: "Admins",
    aliases: ["muteset", "muterole"]
}