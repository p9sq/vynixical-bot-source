const Discord = require("discord.js");
const moment = require("moment");
const modlogs = require("../models/logchannel");

module.exports.run = async (bot, message, args) => {
if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Error! I am missing the `MANAGE_MESSAGES` permission!")
if(!message.member.hasPermission("MANAGE_MESSAGES")) {
  const invalidEmbed = new Discord.MessageEmbed()
    .setTitle("Invalid Permissions!")
    .addField("Permissions Required:", "Manage Messages")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
  message.channel.send(invalidEmbed)
} else {
  if(!args[0]) return message.channel.send("Please specify the amount of messages you want to delete!")
  if(isNaN(args[0])) return message.channel.send("That is not a number!")

  await message.channel.messages.fetch({limit: args[0]}).then(messages => {
    message.channel.bulkDelete(messages)
  })
  message.channel.send(`<:allow:793205689753010217> **Successfully purged ${args[0]} messages**`).then(msg => msg.delete({ timeout: 4000 }))
  const embed5 = new Discord.MessageEmbed()
  modlogs.findOne({guildID: message.guild.id}, (err, ch) => {
    if(!ch) return;
    embed5.addField("The user which used clear command:", `${message.author.tag}`)
    embed5.addField("With an id:", `${message.author.id}`)
    embed5.addField("Messages cleared:", args[0])
    embed5.addField("Clear time:", moment(message.createdAt).format('MMMM Do YYYY, h:mm A'))
    embed5.addField("Cleared at:", message.channel)
    embed5.setTimestamp();
    if(!ch) {
      return;
    } else {
      message.guild.channels.cache.get(ch.channelID).send(embed5)
    }
  })
} 
}

module.exports.config = {
    name: "clear",
    description: "Clears a certain amount of messages",
    usage: "clear <amount>",
    category: "Moderation",
    example: "clear 10",
    accessableby: "Admins",
    aliases: ["clearmsgs", "purge"]
}