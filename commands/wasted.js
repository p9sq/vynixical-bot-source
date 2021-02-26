const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (bot, message, args) => {
  const user = message.mentions.users.last() || message.author;
  const avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
  const image = await canvacord.Canvas.wasted(avatar);
  const img = new Discord.MessageAttachment(image, "wasted.png");
  message.channel.send(img);
};

module.exports.config = {
  name: "wasted",
  description: "WASTED",
  usage: "wasted [user]",
  category: "Image",
  example: "wasted",
  accessableby: "Everyone",
  aliases: [],
};
