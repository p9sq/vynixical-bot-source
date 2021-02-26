const Discord = require("discord.js");
const guildprefix = require("../models/prefix");
const modlogs = require("../models/logchannel");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES")) {
    const invalidEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid Permissions!")
      .addField("Permissions Required:", "Manage Roles")
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
    message.channel.send(invalidEmbed);
  } else {
    if (!args[0]) {
      const embed = new Discord.MessageEmbed();
      guildprefix.findOne({ guildID: message.guild.id }, (err, data) => {
        embed.setTitle("Invalid Usage");
        embed.addField("Correct Usage:", `${data.prefix}addrole <user> <role>`);
        embed.setFooter(
          bot.user.username + " | Addrole command",
          bot.user.displayAvatarURL()
        );
        message.channel.send(embed);
      });
    } else {
      const role =
        message.mentions.roles.last() ||
        message.guild.roles.cache.find(
          (r) => r.name == args.slice(1).join(" ")
        );
      const member = message.mentions.members.last();
      if (!member)
        return message.channel.send(
          "<:deny:793205689488900136> **Please mention a user**"
        );
      if (!role)
        return message.channel.send(
          "<:deny:793205689488900136> **Please specify a role name or mention a role**"
        );
      member.roles.add(role);
      message.channel.send(
        `<:allow:793205689753010217> **${role.name} was successfully given to ${member.user.tag}**`
      );
      const embed = new Discord.MessageEmbed();
      modlogs.findOne({ guildID: message.guild.id }, (err, ch) => {
        embed.setTitle("A user has been given a role");
        embed.setColor(color);
        embed.addField("Role given:", `${role.name}\n\`(${role.id})\``, true);
        embed.addField(
          "Moderator:",
          `${message.author.tag}\n\`(${message.author.id})\``,
          true
        );
        embed.addField(
          "User:",
          `${member.user.tag}\n\`(${member.user.id})\``,
          true
        );
        embed.setTimestamp();
        const channel = message.guild.channels.cache.get(ch.channelID);
        if (!channel) return;
        channel.send(embed);
      });
    }
  }
};

module.exports.config = {
  name: "addrole",
  description: "Gives the mentioned role to the mentioned user",
  usage: "addrole <role> <user>",
  category: "Moderation",
  example: "addrole @Cool Users @Wumpus#0001",
  accessableby: "Admins",
  aliases: ["arole", "giverole"],
};
