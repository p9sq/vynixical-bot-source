const Discord = require("discord.js");
const modlogs = require("../models/logchannel");
const mutedRole = require("../models/mute");

module.exports.run = async (bot, message, args) => {
    const Member = message.mentions.users.last();
    const member = message.mentions.members.last();
    let reason = args.slice(1).join(" ")
    if(!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("<:maybe:793205689153093702> **I am missing the Manage Guild permission**")
    if(!message.member.hasPermission("MANAGE_GUILD")) {
      const invalidEmbed = new Discord.MessageEmbed()
        .setTitle("Invalid Permissions!")
        .addField("Permissions Required:", "Manage Guild")
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
      message.channel.send(invalidEmbed);
    } else {
      if(!member) return message.channel.send("Please mention a user!")
        if(!reason) reason = "No reason provided"
        mutedRole.findOne({ guildID: message.guild.id } , ( err , m ) => {
            member.roles.remove(m.muteID);
            message.channel.send(`<:allow:793205689753010217> **${Member.tag} has been unmuted with reason ${reason}**`)
  
            const muteEmbed = new Discord.MessageEmbed()
            modlogs.findOne({ guildID: message.guild.id}, (err , ch) => {
              muteEmbed.setAuthor(`[UNMUTE] ${Member.tag}`, `${Member.displayAvatarURL()}`)
              muteEmbed.addField("Server unmuted in:", `${message.guild.name}\n\`(${message.guild.id})\``, true)
              muteEmbed.addField("Moderator:", `${message.author.tag}\n\`(${message.author.id})\``, true)
              muteEmbed.addField("Reason:", `${reason}`, true)
              if(!ch) {
                return;
              } else {
                const logschannel = message.guild.channels.cache.get(ch.channelID)
                logschannel.send(muteEmbed)
              }
          })
  
          
      })
      }
}

module.exports.config = {
    name: "unmute",
    description: "Unmutes the mentioned user with a reason",
    usage: "unmute <user> [reason]",
    category: "Moderation",
    example: "unmute @Wumpus#0001 Next time, don't flood general chats",
    accessableby: "Admins",
    aliases: ["unmuteuser", "unmutemember"]
}