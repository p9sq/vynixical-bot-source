const Discord = require("discord.js");
const modlogs = require("../models/logchannel");

module.exports = async (guild, user) => {
  const embed = new Discord.MessageEmbed();
  modlogs.findOne({ guildID: message.guild.id }, (err, ch) => {
    embed.setColor("GREEN");
    embed.setTitle("New user unbanned!");
    embed.addField("User:", `${user}\n\`(${user.id})\``);
    embed.addField("Server:", `${guild}\n\`(${guild.id})\``);
    embed.setTimestamp();
    if (!ch) {
      return;
    } else {
      const logschannel = message.guild.channels.cache.get(ch.channelID);
      logschannel.send(embed);
    }
  });
};
