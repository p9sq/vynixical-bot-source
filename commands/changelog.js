const changelog = require("../models/changelogs");
const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed();
  embed.setTitle(`${bot.user.username} Change logs`);
  embed.setColor(color);
  embed.setThumbnail(bot.user.displayAvatarURL({ format: "png", size: 2048 }));
  embed.setFooter(
    `${bot.user.username} | Change logs`,
    bot.user.displayAvatarURL({ format: "png" })
  );
  embed.setTimestamp();
  changelog.findOne({}, (err, data) => {
    if (!data) {
      embed.setDescription(`${haste}`);
      embed.addField("None", "```None```");
    } else {
      embed.addField(data.date, "```" + data.changeLog + "```");
    }
    message.channel.send(embed);
  });
};

module.exports.config = {
  name: "changelogs",
  description: "View the bots change logs",
  usage: "changelogs",
  category: "Info",
  example: "changelogs",
  accessableby: "Everyone",
  aliases: [],
};
