const superagent = require("superagent");
const { color } = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!args.join(" "))
    return message.channel.send("Please provide a music video title!");
  const { body } = await superagent.get(
    `https://some-random-api.ml/lyrics?title=${encodeURIComponent(
      args.join(" ")
    )}`
  );
  if (!body)
    return message.channel.send(
      "Uh oh, it looks like that there was no body to load. Please try again."
    );
  const embed = new Discord.MessageEmbed()
    .setTitle(body.title)
    .setAuthor(body.author)
    .setColor(color)
    .setDescription(body.lyrics)
    .setTimestamp();
  message.channel.send(embed);
};

module.exports.config = {
  name: "lyrics",
  description: "Shows the lyrics of the specified music video",
  usage: "lyrics <music-video-title>",
  category: "Fun",
  example: "lyrics My heart is cold",
  accessableby: "Everyone",
  aliases: [],
};
