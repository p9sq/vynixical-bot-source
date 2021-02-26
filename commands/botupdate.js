const Discord = require("discord.js");
const { owners, color } = require("../botconfig.json");
const changelog = require("../models/changelogs");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
  if (!owners.includes(message.author.id)) {
    return;
  } else {
    const desc = args.slice(1).join(" ");
    const mChannel = message.mentions.channels.first();
    if (!mChannel)
      return message.channel.send(
        "<:maybe:793205689153093702> **Please mention a channel**"
      );
    if (!desc)
      return message.channel.send(
        "<:deny:793205689488900136> **Please specify the message to announce**"
      );
    message.delete();
    let Version = "";
    const embed = new Discord.MessageEmbed();
    changelog.findOne({}, (err, data) => {
      if (!data) {
        Version = "1.0.1";
        const newChange = new changelog({
          changeLog: desc,
          date: moment(message.createdAt).format("MMMM Do YYYY, h:mm A"),
          version: Version,
        });
        newChange.save();
        embed.setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ format: "png" })
        );
        embed.setTitle(`${bot.user.username} update logs!`);
        embed.addField("Update:", desc);
        embed.setColor(color);
        embed.setThumbnail(bot.user.avatarURL({ size: 2048, format: "png" }));
        embed.setTimestamp();
        message.channel.send(embed);
      } else {
        (data.changeLog = desc),
          (data.date = moment(message.createdAt).format(
            "MMMM Do YYYY, h:mm A"
          )),
          (data.version = Version++);
        data.save();
        embed.setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ format: "png" })
        );
        embed.setTitle(`${bot.user.username} update logs!`);
        embed.addField("Update:", desc);
        embed.setColor(color);
        embed.setThumbnail(bot.user.avatarURL({ size: 2048, format: "png" }));
        embed.setTimestamp();
        message.channel.send(embed);
      }
    });
  }
};

module.exports.config = {
  name: "botupdate",
  description: "Creates an announcement and menitons everyone",
  usage: "botupdate <channel> <message>",
  category: "Developer",
  example: "botupdate BOT NOW HAS A WEBSITE!! :smile:",
  accessableby: "Developer",
  aliases: ["updatebot", "newupdate"],
};
