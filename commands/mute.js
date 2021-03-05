const Discord = require("discord.js");
const mutedRole = require("../models/mute");
const modlogs = require("../models/logchannel");

module.exports.run = async (bot, message, args) => {
  const Member = message.mentions.users.last();
  const member = message.mentions.members.last();
  let reason = args.slice(1).join(" ");
  if (!message.guild.me.hasPermission("MANAGE_ROLES"))
    return message.channel.send(
      "Error! I am missing the `Manage Roles` permission!"
    );
  if (!message.member.hasPermission("MANAGE_ROLES")) {
    let invalidEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid Permissions!")
      .addField("Permissions Required:", "Manage Roles")
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
    message.channel.send(invalidEmbed);
  } else {
    if (
      message.member.roles.highest.position <= member.roles.highest.position &&
      message.guild.ownerID != message.author.id
    )
      return message.channel.send("<:maybe:793205689153093702> **You can't mute them due to hierarchy**");
    if (message.guild.me.roles.highest.position <= member.roles.highest.position)
      return message.channel.send("<:maybe:793205689153093702> **I can't mute them due to hierarchy**");

    if (!member) return message.channel.send("Please mention a user!");
    if (!reason) reason = "No reason provided";
    mutedRole.findOne({ guildID: message.guild.id }, (err, m) => {
      if (!m) return;
      member.roles.add(m.muteID);
      message.channel.send(
        `<:check:314349398811475968> Successfully muted **${Member.tag}** with reason **${reason}**!`
      );

      const muteEmbed = new Discord.MessageEmbed();
      modlogs.findOne({ guildID: message.guild.id }, (err, ch) => {
        muteEmbed.setAuthor(
          `[MUTE] ${Member.tag}`,
          `${Member.displayAvatarURL()}`
        );
        muteEmbed.addField(
          "Server muted in:",
          `${message.guild.name}\n\`(${message.guild.id})\``,
          true
        );
        muteEmbed.addField(
          "Moderator:",
          `${message.author.tag}\n\`(${message.author.id})\``,
          true
        );
        muteEmbed.addField("Reason:", `${reason}`, true);
        if (!ch) {
          return;
        } else {
          const logschannel = message.guild.channels.cache.get(ch.channelID);
          logschannel.send(muteEmbed);
        }
      });
    });
  }
};

module.exports.config = {
  name: "mute",
  description: "Mutes a mentioned user with a reason",
  usage: "mute <user> [reason]",
  category: "Moderation",
  example: "mute @Wumpus#0001 For flooding general chats",
  accessableby: "Admins",
  aliases: ["muteuser", "mutemember"],
};
