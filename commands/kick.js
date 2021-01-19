const Discord = require("discord.js");
const modlogs = require("../models/logchannel");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const Member = message.mentions.users.last();
    let reason = args.slice(1).join(" ")
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("<:maybe:793205689153093702> **I am missing the Kick Members permission**")
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      const invalidEmbed = new Discord.MessageEmbed()
        .setTitle("Invalid Permissions!")
        .addField("Permissions Required:", "Kick Members")
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
      message.channel.send(invalidEmbed);
    } else {
      if(!Member) return message.channel.send("<:maybe:793205689153093702> **Please mention a member to kick**")
      if(!reason) reason = "No reason provided"
      const user = message.mentions.users.last();
      if(user) {
        const member = message.guild.member(user);
        if(member) {
          member.kick(reason).then(() => {
  
              message.channel.send(`<:allow:793205689753010217> **${user.tag} has been banned**`)
  
              const Embed = new Discord.MessageEmbed()
              modlogs.findOne({ guildID: message.guild.id} , ( err , ch ) => {
                Embed.setAuthor(`[KICK] ${Member.tag}`, Member.displayAvatarURL({format: "png"}))
                Embed.addField("Server kicked from:", `${message.guild.name}\n\`(${message.guild.id})\``, true)
                Embed.addField("Moderator:", `${message.author.tag}\n\`(${message.author.id})\``, true)
                Embed.addField("Reason:", reason, true)
                if(!ch) {
                  return;
                } else {
                  const logschannel = message.guild.channels.cache.get(ch.channelID)
                  logschannel.send(Embed)
                }
            })
  
              Member.send(`You have been banned from ${message.guild.name} by ${message.author.tag} for ${reason}`).catch((err) => {
                return message.channel.send(`Uh oh, an error has ocurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners.map(o => `**${bot.users.cache.get(o).tag}**`).join(", or ")} asap.`)
                })

            }).catch((err) => {
              return message.channel.send(`Uh oh, an error has ocurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners.map(o => `**${bot.users.cache.get(o).tag}**`).join(", or ")} asap.`)
            })
        } else {
  
          message.channel.send("<:deny:793205689488900136> **That user isn't in this server**");
      }
    }
  }
}

module.exports.config = {
    name: "kick",
    description: "Kicks a user",
    usage: "kick <user> [reason]",
    category: "Moderation",
    example: "kick @Wumpus#0001 kicked an innocent member",
    accessableby: "Admins",
    aliases: ["kickuser", "kickmember"]
}