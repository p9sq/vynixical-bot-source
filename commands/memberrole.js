const memberRole = require("../models/memberrole");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Invalid Permissions!");
    embed.addField("Permissions Required:", "Manage Guild");
    embed.setFooter(bot.user.username, bot.user.displayAvatarURL());
    message.channel.send(embed);
  } else {
    const role =
      message.mentions.roles.last() || message.guild.roles.cache.get(args[0]);
    if (!args[0]) return message.channel.send("Please mention a role!");
    if (!role) return message.channel.send("Please mention a valid role!");
    memberRole.findOne({ guildID: message.guild.id }, (err, mr) => {
      if (!mr) {
        const newRole = memberRole({
          guildID: message.guild.id,
          roleID: role.id,
        });
        newRole.save();
        message.channel.send(
          `<:allow:793205689753010217> **Successfully set the member role to ${role.name}**`
        );
      } else {
        mr.roleID = role.id;
        mr.save();
        message.channel.send(
          `<:allow:793205689753010217> **Successfully set the member role to ${role.name}**`
        );
      }
    });
  }
};

module.exports.config = {
  name: "memberrole",
  description: "Sets the member role for the server",
  usage: "memberrole <role>",
  category: "Config",
  example: "memberrole @Members",
  accessableby: "Admins",
  aliases: ["mr", "setmemberrole"],
};
