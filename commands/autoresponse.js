const au = require("../models/autoresponse");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Invalid Permissions!");
    embed.addField("Permissions Required:", "Manage Guild");
    embed.setFooter(bot.user.username, bot.user.displayAvatarURL());
    message.channel.send(embed);
  } else {
    if (!args.join(" "))
      return message.channel.send(
        "<:maybe:793205689153093702> **Please specify some text**"
      );
    if (!args.join(" | "))
      return message.channel.send(
        "<:maybe:793205689153093702> **Please specify some text**"
      );
    const text = message.content.slice(14).split(" | ");
    au.findOne({ guildID: message.guild.id }, (err, guildData) => {
      if (!guildData) {
        const newGuildData = au({
          guildID: message.guild.id,
          msg: text[0],
          response: text[1],
        });
        newGuildData.save();
        message.channel.send(
          `<:allow:793205689753010217> **Successfully enabled auto response**`
        );
      } else {
        (guildData.msg = text[0]), (guildData.response = text[1]);
        guildData.save();
        message.channel.send(
          `<:allow:793205689753010217> **Successfully set the auto response message to ${text[1]}**`
        );
      }
    });
  }
};

module.exports.config = {
  name: "autoresponse",
  description: "Sets the auto response message for the server",
  usage: "autoresponse <message> | <response>",
  category: "Config",
  example: "autoresponse How do I get Vynixical Premium? | Just do >premium",
  accessableby: "Admins",
  aliases: ["au"],
};
