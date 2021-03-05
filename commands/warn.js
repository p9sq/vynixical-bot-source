const Discord = require("discord.js");
const warns = require("../models/warns");
const modlogs = require("../models/logchannel");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) {
    const invalidEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid Permissions!")
      .addField("Permissions Required:", "Manage Guild")
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
    message.channel.send(invalidEmbed);
  } else {
    if (
      message.member.roles.highest.position <= user.roles.highest.position &&
      message.guild.ownerID != message.author.id
    )
      return message.channel.send("<:maybe:793205689153093702> **You can't warn them due to hierarchy**");
    if (message.guild.me.roles.highest.position <= user.roles.highest.position)
      return message.channel.send("<:maybe:793205689153093702> **I can't warn them due to hierarchy**");

    let reason = args.slice(1).join(" ");
    const user = message.mentions.users.last();
    if (!user)
      return message.channel.send(
        "<:maybe:793205689153093702> **Please mention a member to warn**"
      );
    if (!reason) reason = "No reason provided";
    warns.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) {
          return message.channel.send(
            `Uh oh, an error has occurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners
              .map((o) => `**${bot.users.cache.get(o).tag}**`)
              .join(", or ")} asap.`
          );
        }
        if (!data) {
          const newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: reason,
              },
            ],
          });
          newWarns.save();
          message.channel.send(
            `<:allow:793205689753010217> **${user.tag} has been warned**`
          );
          const warnEmbed = new Discord.MessageEmbed();
          modlogs.findOne({ guildID: message.guild.id }, (err, ch) => {
            warnEmbed.setAuthor(
              `[WARN] ${user.tag}`,
              `${user.displayAvatarURL()}`
            );
            warnEmbed.addField(
              "Server warned in:",
              `${message.guild.name}\n\`(${message.guild.id})\``,
              true
            );
            warnEmbed.addField(
              "Moderator:",
              `${message.author.tag}\n\`(${message.author.id})\``,
              true
            );
            warnEmbed.addField("Reason:", `${reason}`, true);
            warnEmbed.addField("Warns:", `${data.Warns.length}`, true);
            const logschannel = message.guild.channels.cache.get(ch.channelID);
            if (!logschannel) return;
            logschannel.send(warnEmbed);
          });
          user
            .send(
              `You have been warned by ${bot.user.tag} in ${message.guild.name} for ${reason}`
            )
            .catch((err) => {
              return message.channel.send(
                `Uh oh, an error has occurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners
                  .map((o) => `**${bot.users.cache.get(o).tag}**`)
                  .join(", or ")} asap.`
              );
            });
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: reason,
          });
          data.save();
          message.channel.send(
            `<:allow:793205689753010217> **${user.tag} has been warned. Warns: ${data.Warns.length}**`
          );
          const warnEmbed = new Discord.MessageEmbed();
          modlogs.findOne({ guildID: message.guild.id }, (err, ch) => {
            warnEmbed.setAuthor(
              `[WARN] ${user.tag}`,
              `${user.displayAvatarURL()}`
            );
            warnEmbed.addField(
              "Server warned in:",
              `${message.guild.name}\n\`(${message.guild.id})\``,
              true
            );
            warnEmbed.addField(
              "Moderator:",
              `${message.author.tag}\n\`(${message.author.id})\``,
              true
            );
            warnEmbed.addField("Reason:", `${reason}`, true);
            warnEmbed.addField("Warns:", `${data.Warns.length}`, true);
            const logschannel = message.guild.channels.cache.get(ch.channelID);
            logschannel.send(warnEmbed);
          });
          user
            .send(
              `You have been warned by ${bot.user.tag} in ${message.guild.name} for ${reason}`
            )
            .catch((err) => {
              return message.channel.send(
                `Uh oh, an error has occurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners
                  .map((o) => `**${bot.users.cache.get(o).tag}**`)
                  .join(", or ")} asap.`
              );
            });
        }
      }
    );
  }
};

module.exports.config = {
  name: "warn",
  description: "Warns a user with a reason",
  usage: "warn <user> [reaon]",
  category: "Moderation",
  example: "warn @Wumpus#0001 Swearing in general chats",
  accessableby: "Admins",
  aliases: ["warnuser", "warnmember"],
};
