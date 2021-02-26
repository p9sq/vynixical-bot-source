const modlogs = require("../models/logchannel");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Invalid Permissions!");
    embed.addField("Permissions Required:", "Manage Guild");
    embed.setFooter(bot.user.username, bot.user.displayAvatarURL());
    message.channel.send(embed);
  } else {
    const channel = message.mentions.channels.last();
    if (!channel) return message.channel.send("Please mention a channel!");
    modlogs.findOne({ guildID: message.guild.id }, (err, ch) => {
      if (!ch) {
        const newChannel = modlogs({
          guildID: message.guild.id,
          channelID: channel.id,
        });
        newChannel.save();
        message.channel.send(
          `<:allow:793205689753010217> **Successfully set the logs channel to ${channel.name}**`
        );
      } else {
        ch.channelID = channel.id;
        ch.save();
        message.channel.send(
          `<:allow:793205689753010217> **Successfully set the logs channel to ${channel.name}**`
        );
      }
    });
  }
};

module.exports.config = {
  name: "setlogs",
  description: "Sets the logging channel to a channel of your choice",
  usage: "setlogs <channel>",
  category: "Config",
  example: "setlogs #general",
  accessableby: "Admins",
  aliases: ["logsset", "logschannel"],
};
