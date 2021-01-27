const Discord = require("discord.js");
const mutedRole = require("../models/mute");
const modlogs = require("../models/logchannel");
const cases = require("../models/cases");

module.exports.run = async (bot, message, args) => {
    const Member = message.mentions.users.last();
    const member = message.mentions.members.last();
    let reason = args.slice(1).join(" ")
    if(!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("Error! I am missing the `MANAGE_GUILD` permission!")
    if(!message.member.hasPermission("MANAGE_GUILD")) {
      let invalidEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid Permissions!")
      .addField("Permissions Required:", "Manage Guild")
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
      message.channel.send(invalidEmbed);
    } else {
      if(!member) return  message.channel.send("Please mention a user!")
        if(!reason) reason = "No reason provided"
        mutedRole.findOne({ guildID: message.guild.id } , ( err , m ) => {
          if(!m) return;
            member.roles.add(m.muteID);
            message.channel.send(`<:check:314349398811475968> Successfully muted **${Member.tag}** with reason **${reason}**!`)

            cases.findOne({guildID: message.guild.id}, (err, data) => {
              if(!data) {
                const newData = cases({
                  guildID: message.guild.id,
                  cases: [
                    {
                      id: 1,
                      action: "mute",
                      moderator: message.author.id,
                      member: member.user.id,
                      reason: reason
                    }
                  ]
                });
                newData.save();
                const muteEmbed = new Discord.MessageEmbed()
              modlogs.findOne({ guildID: message.guild.id}, (err , ch) => {
                muteEmbed.setAuthor(`[MUTE] ${Member.tag}`, `${Member.displayAvatarURL()}`)
                muteEmbed.addField("Server muted in:", `${message.guild.name}\n\`(${message.guild.id})\``, true)
                muteEmbed.addField("Moderator:", `${message.author.tag}\n\`(${message.author.id})\``, true)
                muteEmbed.addField("Reason:", `${reason}`, true)
                muteEmbed.addField("Case No.:", newData.cases.id, true)
                if(!ch) {
                  return;
                } else {
                  const logschannel = message.guild.channels.cache.get(ch.channelID)
                  logschannel.send(muteEmbed)
                }
              })
              } else {
                data.cases.unshift({
                  id: data.cases.id- + -1,
                  action: "mute",
                  moderator: message.author.id,
                  member: member.user.id,
                  reason: reason
                });
                data.save();
                const muteEmbed = new Discord.MessageEmbed()
              modlogs.findOne({ guildID: message.guild.id}, (err , ch) => {
                muteEmbed.setAuthor(`[MUTE] ${Member.tag}`, `${Member.displayAvatarURL()}`)
                muteEmbed.addField("Server muted in:", `${message.guild.name}\n\`(${message.guild.id})\``, true)
                muteEmbed.addField("Moderator:", `${message.author.tag}\n\`(${message.author.id})\``, true)
                muteEmbed.addField("Reason:", `${reason}`, true)
                muteEmbed.addField("Case No.:", data.cases.id, true)
                if(!ch) {
                  return;
                } else {
                  const logschannel = message.guild.channels.cache.get(ch.channelID)
                  logschannel.send(muteEmbed)
                }
              })
              }
            })
      })
      }
}

module.exports.config = {
    name: "mute",
    description: "Mutes a mentioned user with a reason",
    usage: "mute <user> [reason]",
    category: "Moderation",
    example: "mute @Wumpus#0001 For flooding general chats",
    accessableby: "Admins",
    aliases: ["muteuser", "mutemember"]
}