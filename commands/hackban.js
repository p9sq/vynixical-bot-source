const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      "<:maybe:793205689153093702> **I am missing the Ban Members permission**"
    );
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const invalidEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid Permissions!")
      .addField("Permissions Required:", "Ban Members")
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
    message.channel.send(invalidEmbed);
  } else {
    const userID = args[0];
    let reason = args.slice(1).join(" ");

    if (!userID)
      return message.channel.send(
        "<:deny:793205689488900136> **Please specify a valid user id**"
      );
    if (isNaN(userID))
      return message.channel.send(
        "<:maybe:793205689153093702> **User ID must be a number**"
      );
    if (userID === message.author.id)
      return message.channel.send(
        "<:deny:793205689488900136> **You can't ban yourself**"
      );
    if (userID === bot.user.id)
      return message.channel.send(
        "<:deny:793205689488900136> **You can't ban me. Why?**"
      );

    if (!reason) reason = "No reason provided";

    bot.users
      .fetch(userID)
      .then(async (user) => {
        await message.guild.members.ban(user.id, { reason: reason });
        return message.channel.send(
          `<:allow:793205689753010217> **${user.tag} Was successfully banned outside of this server**`
        );
      })
      .catch((error) => {
        return message.channel.send(
          `Uh oh, an error has occurred while running the command. Error: **${error}**. Make sure to report this to ${botconfig.owners
            .map((o) => `**${bot.users.cache.get(o).tag}**`)
            .join(", or ")} asap.`
        );
      });
  }
};

module.exports.config = {
  name: "hackban",
  description:
    "Hackbans the user by id (Bans the user that isn't in the server)",
  usage: "hackban <user-id>",
  category: "Moderation",
  example: "hackban 490064230717063195",
  accessableby: "Admins",
  aliases: ["hb", "banhack"],
};
