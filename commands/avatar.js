const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  const Member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;
  const embed = new Discord.MessageEmbed()
    .setTitle(`${Member.user.username}'s avatar`)
    .setThumbnail(Member.user.username.defaultAvatarURL)
    .setImage(Member.user.username.avatarURL({ size: 2048, dynamic: true, format: "png" }))
    .setDescription(
      `Formats: [png](${Member.user.username.avatarURL({
        size: 2048,
        dynamic: true,
        format: "png",
      })}) | [jpg](${Member.user.username.avatarURL({
        size: 2048,
        dynamic: true,
        format: "jpg",
      })}) | [webp](${Member.user.username.avatarURL({
        size: 2048,
        dynamic: true,
        format: "webp",
      })})`
    )
    .setColor(color);
  message.channel.send(embed);
};

module.exports.config = {
  name: "avatar",
  description: "Shows the users avatar",
  usage: "avatar [user]",
  category: "Fun",
  example: "avatar @Wumpus#0001",
  accessableby: "Everyone",
  aliases: ["useravatar", "memberavatar"],
};
