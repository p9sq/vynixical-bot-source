const warns = require("../models/warns");
const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) {
    const invalidEmbed = new Discord.MessageEmbed()
      .setTitle("Invalid Permissions!")
      .addField("Permissions Required:", "Manage Guild")
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
    message.channel.send(invalidEmbed);
  } else {
    const user = message.mentions.members.last();
    if (!user)
      return message.reply("You must mention a user to see their warns!");
    warns.find(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) {
          return message.channel.send(
            `Uh oh, an error has ocurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners
              .map((o) => `**${bot.users.cache.get(o).tag}**`)
              .join(", or ")} asap.`
          );
        }
        if (!data)
          return message.channel.send(
            `**${user.user.tag}** hasn't been warned at all!`
          );
        else {
          const Embed = new Discord.MessageEmbed()
            .setTitle(`${user.user.tag} warns in ${message.guild.name}`)
            .setTimestamp()
            .setDescription(
              data.map((d) => {
                return d.Warns.map(
                  (w, i) =>
                    `${i} - Moderator: ${
                      message.guild.members.cache.get(w.Moderator).user.tag
                    }, Reason: ${w.Reason}`
                ).join("\n");
              })
            );
          message.channel.send(Embed);
        }
      }
    );
  }
};

module.exports.config = {
  name: "warns",
  description: "Shows the warns from a mentioned user",
  usage: "warns <user>",
  category: "Moderation",
  example: "warns @Wumpus#0001",
  accessableby: "Admins",
  aliases: ["userwarns", "memberwarns"],
};
