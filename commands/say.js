const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (args[1] === "embed") {
    const channel = message.mentions.channels.first();
    const msg = args.slice(2).join(" ");
    if (!channel)
      return message.channel.send(
        "<:maybe:793205689153093702> **Please mention a channel**"
      );
    if (!msg)
      return message.channel.send(
        "<:maybe:793205689153093702> **Please specify a message**"
      );
    const embed = new Discord.MessageEmbed();
    embed.setDescription(msg);
    embed.setColor(color);
    embed.setFooter(`Sent by: ${message.author.tag}`);
    channel.send(embed);
  } else {
    const channel = message.mentions.channels.first();
    const msg = args.slice(1).join(" ");
    if (!channel)
      return message.channel.send(
        "<:maybe:793205689153093702> **Please mention a channel**"
      );
    if (!msg)
      return message.channel.send(
        "<:maybe:793205689153093702> **Please specify a message**"
      );
    channel.send(`${msg}\n\nSent by: ${message.author.tag}`);
  }
};

module.exports.config = {
  name: "say",
  description: "Sends a regular message or an embed in the mentioned channel",
  usage: "say <channel> [embed] <message>",
  category: "Fun",
  example: "say #general embed Hello World",
  accessableby: "Everyone",
  aliases: ["channelsay", "saymsgchannel"],
};
