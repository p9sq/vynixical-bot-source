const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  const channel =
    message.mentions.channels.last() ||
    message.guild.channels.cache.get(args[0]) ||
    message.guild.channels.cache.find(
      (channel) => channel.name === args.join(" ")
    );
  if (!channel)
    return message.channel.send(
      "Please mention a channel, or specify a channel id, or specify a channel name!"
    );
  const embed = new Discord.MessageEmbed()
    .setTitle(`${channel.name} info`)
    .setThumbnail(
      message.guild.iconURL({ format: "png", dyamic: true, size: 2048 })
    )
    .setColor(color)
    .addField("Name:", channel.name, true)
    .addField("ID:", channel.id, true)
    .addField("Deleted:", channel.deleted ? "Yes" : "No", true)
    .addField("Type:", bot.utils.capitalizeFirstLetter(channel.type), true)
    .addField("Raw position:", channel.rawPosition, true);
  if (!channel.type === "category") {
    embed.addField("Parent ID:", channel.parentID, true);
  }
  if (channel.type === "text") {
    embed.addField("Topic:", channel.topic, true);
    embed.addField("NSFW:", channel.nsfw ? "Yes" : "No", true);
    embed.addField("Last Message ID:", channel.lastMessageID, true);
    embed.addField("Last Pin Timestamp:", channel.lastPinTimestamp, true);
  }
  embed.setTimestamp();
  message.channel.send(embed);
};

module.exports.config = {
  name: "channelinfo",
  description: "Shows the channel info by mention, id, or name",
  usage: "channelinfo <channel-id | channel-name | channel-mention>",
  category: "Info",
  example: "channelinfo general",
  accessableby: "Everyone",
  aliases: ["channel"],
};
