const Discord = require("discord.js");
const modlogs = require("../models/logchannel");
const guildprefix = require("../models/prefix");

module.exports.run = async (bot, message, args) => {
  guildprefix.findOne({ guildID: message.guild.id }, (err, data) => {
    const prefix = data.prefix;
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        "<:maybe:793205689153093702> **I am missing the Manage Roles permission**"
      );
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      const invalidEmbed = new Discord.MessageEmbed()
        .setTitle("Invalid Permissions!")
        .addField("Permissions Required:", "Manage Roles")
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
      message.channel.send(invalidEmbed);
    } else {
      let rName = message.content.split(prefix + "createrole ").join("");
      let rColor;
      args.forEach((arg) => {
        if (arg.startsWith("#")) {
          rColor = arg;
        }
      });
      if (!rName) {
        return message.channel.send(
          "<:deny:793205689488900136> **Please specify a role name**"
        );
      }

      if (!rColor) {
        return message.channel.send(
          "<:deny:793205689488900136> **You did not specify a color for your role**"
        );
      }
      if (rColor >= 16777215)
        return message.channel.send(
          "<:deny:793205689488900136> **That hex color is to big. Keep it between 0 and 16777215**"
        );
      if (rColor <= 0)
        return message.channel.send(
          "<:deny:793205689488900136> **That hex color is to small! Keep it between 0 and 16777215**"
        );
      rName = rName.replace(`${rColor}`, ``);
      let rNew = message.guild.roles.create({
        data: {
          name: rName,
          color: rColor,
        },
      });
      message.channel.send(
        `<:allow:793205689753010217> **Successfully made the ${rNew.name} role**`
      );
      const Embed = new Discord.MessageEmbed();
      modlogs.findOne({ guildID: message.guild.id }, (err, ch) => {
        Embed.setTitle("New role created!");
        Embed.setColor(`${rColor}`);
        Embed.addField("Role name:", `${rName}`);
        Embed.addField("Role color:", `${rColor}`);
        const logschannel = message.guild.channels.cache.get(ch.channelID);
        if (!logschannel) return;
        logschannel.send(Embed);
      });
    }
  });
};

module.exports.config = {
  name: "createrole",
  description: "Creates a role with a color and name",
  usage: "createrole <#hexcolor> <name>",
  category: "Moderation",
  example: "createrole #123 Cool People",
  accessableby: "Admins",
  aliases: [],
};
