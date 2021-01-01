const Discord = require("discord.js");
const modlogs = require("../models/logchannel");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) {
        let invalidEmbed = new Discord.MessageEmbed()
        .setTitle("Invalid Permissions!")
        .addField("Permissions Required:", "Manage Roles")
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
        message.channel.send(invalidEmbed);
      } else {
            const role = message.mentions.roles.last() || message.guild.roles.cache.find(r => r.name == args.slice(1).join(" "));
            let member = message.mentions.members.last();
            if(!member) return message.channel.send("<:maybe:793205689153093702> **Please mention a user**")
            if(!role) return message.channel.send("<:maybe:793205689153093702> **Please specify a role name or mention a role**")
            member.roles.remove(role)
            message.channel.send(`<:allow:793205689753010217> **Successfully removed ${role.name} from ${member.user.tag}**`)
            let embed = new Discord.MessageEmbed()
            modlogs.findOne({guildID: message.guild.id}, (err, ch) => {
                embed.setColor(color)
                embed.setTitle("A role has been removed from a user")
                embed.addField("Role removed:", `${role.name}\n\`(${role.id})\``, true)
                embed.addField("Moderator:", `${message.author.tag}\n\`(${message.author.id})\``, true)
                embed.addField("User:", `${member.user.tag}\n\`(${member.user.id})\``, true)
                embed.setFooter(bot.user.username, bot.user.displayAvatarURL())
                embed.setTimestamp()
                if(!ch) {
                    return;
                  } else {
                    const logschannel = message.guild.channels.cache.get(ch.channelID)
                    logschannel.send(embed)
                  }

            })
      }
}

module.exports.config = {
    name: "removerole",
    description: "Removes the mentioned role from the mentioned user",
    usage: "removerole <role> <user>",
    category: "Moderation",
    example: "removerole @Cool Users @Wumpus#0001",
    accessableby: "Admins",
    aliases: ["rrole", "unrole"]
}