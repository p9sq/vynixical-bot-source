const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  const snipes = bot.snipes.get(message.channel.id) || [];
  const msg = snipes[args[0] - 1 || 0];
  if (!msg) return message.channel.send("❌ There's nothing to snipe!");
  const embed = new Discord.MessageEmbed()
    .setAuthor(
      msg.author.tag,
      msg.author.displayAvatarURL({ dynamic: true, size: 256 })
    )
    .setColor(color)
    .setDescription(msg.content)
    .setFooter(`Date: ${msg.date} | ${args[0] || 1}/${snipes.length}`);
  if (msg.attachment) {
    embed.setImage(msg.attachment);
  }
  message.channel.send(embed);
};

module.exports.config = {
  name: "snipe",
  description: "Gets the recent deleted message",
  usage: "snipe [number]",
  category: "Info",
  example: "snipe 5",
  accessableby: "Everyone",
  aliases: [],
};
