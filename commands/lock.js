const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(
      "<:maybe:793205689153093702> **I am missing the Manage Channels permission**"
    );
  if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    const invalidEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid Permissions!")
      .addField("Permissions Required:", "Manage Channels")
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
    message.channel.send(invalidEmbed);
  } else {
    const channels = message.guild.channels.cache.filter(
      (ch) => ch.type !== "category"
    );
    if (args[0] === "on") {
      channels.forEach((channel) => {
        channel
          .updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: false,
          })
          .then(() => {
            channel.setName((channel.name += "🔒"));
          });
      });
      return message.channel.send(
        `<:allow:793205689753010217> **Successfully locked all channels**`
      );
    } else if (args[0] === "off") {
      channels.forEach((channel) => {
        channel
          .updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: true,
          })
          .then(() => {
            channel.setName(channel.name.replace("🔒", ""));
          });
      });
      return message.channel.send(
        `<:allow:793205689753010217> **Successfully unlocked all channels**`
      );
    }
  }
};

module.exports.config = {
  name: "lock",
  description: "Locks every single channel in the server",
  usage: "lock <on - off>",
  category: "Moderation",
  example: "lock on",
  accessableby: "Admins",
  aliases: ["lockall", "lockchannels"],
};
