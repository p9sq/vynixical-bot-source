const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (bot, message, args) => {
  if (!args.join(" ")) return message.channel.send("Please provide a message!");
  const text = await canvacord.Canvas.clyde(args.join(" "));
  const img = new Discord.MessageAttachment(text, "clyde.png");
  message.channel.send(img);
};

module.exports.config = {
  name: "clyde",
  description: "Makes clyde send anything (As a image)",
  usage: "clyde [text]",
  category: "Image",
  example: "clyde Hello World",
  accessableby: "Everyone",
  aliases: [],
};
