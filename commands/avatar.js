const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  const Member =
    message.mentions.members.last() ||
    message.guild.members.cache.get(args[0]) ||
    message.member ||
    "server";
  if (Member === "server".toLowerCase()) {
    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name} Icon`)
      .setImage(
        message.guild.iconURL({ size: 2048, dynamic: true, format: "png" })
      )
      .setDescription(
        `Formats: [png](${Member.user.avatarURL({
          size: 2048,
          dynamic: true,
          format: "png",
        })}) | [jpg](${Member.user.avatarURL({
          size: 2048,
          dynamic: true,
          format: "jpg",
        })}) | [webp](${Member.user.avatarURL({
          size: 2048,
          dynamic: true,
          format: "webp",
        })})`
      )
      .setColor(color);
    message.channel.send(embed);
  } else {
    const embed = new Discord.MessageEmbed()
      .setTitle(`${Member.user.username}'s avatar`)
      .setThumbnail(Member.user.defaultAvatarURL)
      .setImage(
        Member.user.avatarURL({ size: 2048, dynamic: true, format: "png" })
      )
      .setDescription(
        `Formats: [png](${Member.user.avatarURL({
          size: 2048,
          dynamic: true,
          format: "png",
        })}) | [jpg](${Member.user.avatarURL({
          size: 2048,
          dynamic: true,
          format: "jpg",
        })}) | [webp](${Member.user.avatarURL({
          size: 2048,
          dynamic: true,
          format: "webp",
        })})`
      )
      .setColor(color);
    message.channel.send(embed);
  }
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
