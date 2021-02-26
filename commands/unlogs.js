const modlogs = require("../models/logchannel");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const invalidEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid Permissions!")
      .addField("Permissions Required:", "Administrator")
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
    message.channel.send(invalidEmbed);
  } else {
    modlogs.findOneAndDelete({ guildID: message.guild.id }, (err, ch) => {
      message.channel.send(
        `<:allow:793205689753010217> **Successfully disabled the ${
          message.guild.channels.cache.get(ch.channelID).name
        } logs channel from ${message.guild.name}**`
      );
    });
  }
};

module.exports.config = {
  name: "disablelogs",
  description: "Disables the logging channel from the server",
  usage: "disablelogs",
  category: "Config",
  example: "disablelogs",
  accessableby: "Admins",
  aliases: ["unlogs", "dellogs"],
};
