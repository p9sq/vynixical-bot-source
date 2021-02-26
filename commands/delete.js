const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (bot, message, args) => {
  const user = message.mentions.users.last() || message.author;
  const avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
  const image = await canvacord.Canvas.delete(avatar, true);
  const img = new Discord.MessageAttachment(image, "delete.png");
  message.channel.send(img);
};

module.exports.config = {
  name: "delete",
  description: "Moves your avatar to the bin ;)",
  usage: "delete [user]",
  category: "Image",
  example: "delete @Wumpus#0001",
  accessableby: "Everyone",
  aliases: [],
};
