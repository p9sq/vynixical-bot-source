const Discord = require("discord.js");
const antiswear = require("../models/antiswear");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Invalid Permissions!");
    embed.addField("Permissions Required:", "Manage Guild");
    embed.setFooter(
      bot.user.username,
      bot.user.displayAvatarURL({ format: "png" })
    );
    message.channel.send(embed);
  } else {
    antiswear.findOne({ guildID: message.guild.id }, (err, anti) => {
      if (!anti) {
        const newConfig = new antiswear({
          guildID: message.guild.id,
          enabled: "true",
        });
        newConfig.save();
        message.channel.send(
          `<:allow:793205689753010217> **Anti-swearing has now been enabled**`
        );
      } else {
        message.channel.send(
          "<:deny:793205689488900136> **Anti-swearing is already off**"
        );
      }
    });
  }
};

module.exports.config = {
  name: "antiswear",
  description: "Enables anti-swear for the server",
  usage: "antiswear",
  category: "Config",
  example: "antiswear",
  accessableby: "Admins",
  aliases: [],
};
