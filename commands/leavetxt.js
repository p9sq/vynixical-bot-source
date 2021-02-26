const leavetxt = require("../models/leavetext");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) {
    const embed = new Discord.MessageEmbed();
    embed.setTitle("Invalid Permissions!");
    embed.addField("Permissions Required:", "Manage Guild");
    embed.setFooter(bot.user.username, bot.user.displayAvatarURL());
    message.channel.send(embed);
  } else {
    const msg = args.join(" ");
    if (!msg) return message.channel.send("Please provide a message!");
    leavetxt.findOne({ guildID: message.guild.id }, (err, lt) => {
      if (!lt) {
        const newMSG = leavetxt({
          guildID: message.guild.id,
          msg: msg,
        });
        newMSG.save();
        message.channel.send(
          `<:allow:793205689753010217> **Successfully set the leave message to ${msg}**`
        );
      } else {
        lt.msg = msg;
        lt.save();
        message.channel.send(
          `<:allow:793205689753010217> **Successfully set the leave message to ${msg}**`
        );
      }
    });
  }
};

module.exports.config = {
  name: "leavemsg",
  description: "Sets the leave message for the server",
  usage: "leavemsg <message>",
  category: "Config",
  example:
    "leavemsg It's sad to hear, but a member has just left the server :cry:",
  accessableby: "Admins",
  aliases: ["leavemessage", "leavemsg"],
};
