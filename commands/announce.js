const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const invalidEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid Permissions!")
      .addField("Permissions Required:", "Administrator")
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
    message.channel.send(invalidEmbed);
  } else {
    const desc = args.slice(1).join(" ");
    const mChannel = message.mentions.channels.last();
    if (!mChannel) return message.channel.send("Please mention a channel.");
    if (!desc)
      return message.channel.send("Please specify a message to announce.");
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ format: "png" })
      )
      .setTitle("Announcement!")
      .setColor(color)
      .addField("Announcement:", desc)
      .setColor("RANDOM")
      .setThumbnail(
        message.guild.iconURL({ size: 2048, dynamic: true, format: "png" })
      )
      .setTimestamp();
    mChannel.send("@everyone", embed);
  }
};

module.exports.config = {
  name: "announce",
  description: "Announces a message and mentions everyone",
  usage: "announce <message>",
  category: "Moderation",
  example: "announce New giveaway starting in 12 hrs! :smile:",
  accessableby: "Admins",
  aliases: ["announcemsg", "msgannounce"],
};
