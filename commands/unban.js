const Discord = require("discord.js");
const modlogs = require("../models/logchannel");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  const user = await bot.users.fetch(args[0]);
  let reason = args.slice(1).join(" ");
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
    if (args.length < 1)
      return message.channel.send(
        "<:deny:793205689488900136> **Please specify a user id**"
      );
    if (!reason) reason = "No reason provided";

    message.guild.members
      .unban(user)
      .then(() => {
        message.channel.send(
          `<:allow:793205689753010217> **Successfully unbanned ${user.tag}**`
        );

        const Embed = new Discord.MessageEmbed();
        modlogs.findOne({ guildID: message.guild.id }, (err, ch) => {
          Embed.setAuthor(
            `[UNBAN] ${user.tag}`,
            user.displayAvatarURL({ format: "png" })
          );
          Embed.addField(
            "Server unbanned from:",
            `${message.guild.name}\n\`(${message.guild.id})\``,
            true
          );
          Embed.addField(
            "Moderator:",
            `${message.author.tag}\n\`(${message.author.id})\``,
            true
          );
          Embed.addField("Reason:", reason, true);
          if (!ch) {
            return;
          } else {
            const logschannel = message.guild.channels.cache.get(ch.channelID);
            logschannel.send(Embed);
          }
        });

        user
          .send(
            `You have been unbanned from ${message.guild.name} by ${message.author.tag} for ${reason}`
          )
          .catch((err) => {
            return message.channel.send(
              `Uh oh, an error has occurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners
                .map((o) => `**${bot.users.cache.get(o).tag}**`)
                .join(", or ")} asap.`
            );
          });
      })
      .catch((err) => {
        return message.channel.send(
          `Uh oh, an error has occurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners
            .map((o) => `**${bot.users.cache.get(o).tag}**`)
            .join(", or ")} asap.`
        );
      });
  }
};

module.exports.config = {
  name: "unban",
  description: "Unbans a user with a reason",
  usage: "unban <user_id> [reason]",
  category: "Moderation",
  example: "unban @Wumpus#0001 You were unbanned. Please behave in the server",
  accessableby: "Admins",
  aliases: ["unbanuser", "unbanmember"],
};
