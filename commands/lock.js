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
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    const methods = ["on", "off"];

    if (!channel)
      return message.channel.send(
        "<:maybe:793205689153093702> **Please mention a channel to lock**"
      );
    if (!message.guild.channels.cache.get(channel.id))
      return message.channel.send(
        "<:deny:793205689488900136> **That isn't a valid channel**"
      );

    if (!args[1])
      return message.channel.send(
        "<:maybe:793205689153093702> **Make sure you are specifing `on` or `of` depending on what you're doing to lock or unlock a specific channel"
      );
    if (!methods.includes(args[1]))
      return message.channel.send(
        "<:maybe:793205689153093702> **Invalid option. Make sure you are specifing either `on` or `off` depending on what you're doing to lock or unlock a specific channel**"
      );

    if (args[1] === methods[0]) {
      channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: false });
    } else if (args[1] === methods[1]) {
      channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: true });
    }
  }
};

module.exports.config = {
  name: "lock",
  description: "Locks or unlocks a specific channel",
  usage: "lock <channel> <on - off>",
  category: "Moderation",
  example: "lock #general on",
  accessableby: "Admins",
  aliases: ["lockchannel"],
};
