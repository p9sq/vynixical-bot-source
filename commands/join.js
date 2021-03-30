const Discord = require("discord.js");
const { owners } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  const channel = message.mentions.channels.first();
  if (!owners.includes(message.author.id)) {
    return;
  } else {
    if (!channel) return message.reply("Please a voice channel!");
    if (!channel.type === "text")
      return message.reply("I can't join text channels!");
    const Embed = new Discord.MessageEmbed()
      .setTitle("<a:yes:736089080521293894> Success!")
      .setColor("GREEN")
      .setDescription(`Successfully joined the ${channel} voice channel!`);
    message.reply(Embed);
    channel.join();
  }
};

module.exports.config = {
  name: "joinvc",
  description: "Joins a voice channel by id",
  usage: "joinvc <channel id>",
  category: "Developer",
  example: "joinvc 692883223184670760",
  accessableby: "Developer",
  aliases: ["vcjoin", "connectvc"],
};
