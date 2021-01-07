const users = require("../models/users");
const userlevel = require("../models/userlevel");
const config = require("../models/config");
const antiswear = require("../models/antiswear");
const modlogs = require("../models/logchannel");
const warns = require("../models/warns");
const lvlch = require("../models/lvlchannel");
const guildprefix = require("../models/prefix");
const au = require("../models/autoresponse");
const botconfig = require("../botconfig.json");
const { badwords } = require("../badwords.json");
const Discord = require("discord.js");
let num = 50;

module.exports = async (bot, message) => {
if(message.author.bot || message.channel.type === "dm") return;
users.findOne({userID: message.author.id, guildID: message.guild.id}, (err, member) => {
config.findOne({guildID: message.guild.id}, (err, lvl) => {
userlevel.findOne({guildID: message.guild.id, userID: message.author.id}, (err, user) => {
lvlch.findOne({guildID: message.guild.id}, (err, levelch) => {
antiswear.findOne({guildID: message.guild.id}, (err, anti) => {
au.findOne({guildID: message.guild.id}, (err, guildData) => {
guildprefix.findOne({guildID: message.guild.id, guildName: message.guild.name}, (err , res) => {
  if(!res) {
    const guild = guildprefix({
      guildID: message.guild.id,
      guildOwner: message.guild.owner.user.tag,
      guildName: message.guild.name,
      prefix: ">"
    })
    guild.save()
    message.channel.send(`Hey there, it looks like that the server prefix hasn't been saved yet. I've now saved the server prefix to my DataBase as \`${guild.prefix}\`. Try running \`${guild.prefix}help\` for a list of commands.`).then((msg) => {
      msg.delete({timeout: 7000})
    })
  } else {
    const mentionRegex = RegExp(`^<@!${bot.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!${bot.user.id}> `);
    if(message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${res.prefix}\`, Mention works as a prefix to!`);
    const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : res.prefix.toLowerCase();
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if(!message.content.startsWith(prefix)) return;
    const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(command) command.run(bot, message, args).catch((err) => {
      message.channel.send(`Uh oh, an error has ocurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners.map(o => `**${bot.users.cache.get(o).tag}**`).join(", or ")} asap.`)
    })
  }
})

if(message.author.id === bot.user.id && message.content.includes(botconfig.token)) {
  message.delete()
  message.channel.send(message.content.replace(new RegExp(botconfig.google, "gi"), "*".repeat(botconfig.google.length)))
}

if(!guildData) {
  return;
} else {
  if(message.content === guildData.msg) {
    message.reply(guildData.response)
  }
}
})

    if(!anti) {
      return;
    } else {

  const blacklisted = badwords;

  if(message.member.hasPermission("ADMINISTRATOR") || message.member.id === message.guild.owner.id) return;

    let foundInText = false;
    for (const word in blacklisted) {
      if (message.content.toLowerCase().includes(blacklisted[word].toLowerCase()))
        foundInText = true;
    }

    if (foundInText) {
      message.delete();
      warns.findOne({Guild: message.guild.id, User: message.author.id}, async(err, data) => {
        if(err) {
          message.channel.send(`Uh oh, an error has ocurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners.map(o => `**${bot.users.cache.get(o).tag}**`).join(", or ")} asap.`)
        }
        if(!data) {
            let newWarns = new warns({
                User: message.author.id,
                Guild: message.guild.id,
                Warns:[
                    {
                        Moderator: message.guild.me.id,
                        Reason: "Bad Word Usage"
                    }
                ]
            })
            newWarns.save()
            message.channel.send(`<:allow:793205689753010217> **${message.author.tag} has been warned**`)
            let warnEmbed = new Discord.MessageEmbed()
            modlogs.findOne({guildID: message.guild.id}, (err, ch) => {
                warnEmbed.setAuthor(`[WARN] ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                warnEmbed.addField("Server warned in:", `${message.guild.name}\n\`(${message.guild.id})\``, true)
                warnEmbed.addField("Moderator:", `${bot.user.tag}\n\`(${message.guild.me.id})\``, true)
                warnEmbed.addField("Reason:", "Bad Word Usage", true)
                warnEmbed.addField("Warns:", `${data.Warns.length}`, true)
                const logschannel = message.guild.channels.cache.get(ch.channelID)
                if(!logschannel) return;
                logschannel.send(warnEmbed)
            })
            message.author.send(`You have been warned by ${bot.user.tag} in ${message.guild.name} for Bad Word Usage`).catch((err) => {
              message.channel.send(`Uh oh, an error has ocurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners.map(o => `**${bot.users.cache.get(o).tag}**`).join(", or ")} asap.`)
              });
        }else{
            data.Warns.unshift({
                Moderator: message.guild.me.id,
                Reason: "Bad Word Usage"
            })
            data.save()
            message.channel.send(`<:allow:793205689753010217> **${message.author.tag} has been warned**`)
            let warnEmbed = new Discord.MessageEmbed()
            modlogs.findOne({guildID: message.guild.id}, (err, ch) => {
                warnEmbed.setAuthor(`[WARN] ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                warnEmbed.addField("Server warned in:", `${message.guild.name}\n\`(${message.guild.id})\``, true)
                warnEmbed.addField("Moderator:", `${bot.user.tag}\n\`(${message.guild.me.id})\``, true)
                warnEmbed.addField("Reason:", "Bad Word Usage", true)
                warnEmbed.addField("Warns:", `${data.Warns.length}`, true)
                const logschannel = message.guild.channels.cache.get(ch.channelID)
                logschannel.send(warnEmbed)
            })
            message.author.send(`You have been warned by ${bot.user.tag} in ${message.guild.name} for Bad Word Usage`).catch((err) => {
              message.channel.send(`Uh oh, an error has ocurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners.map(o => `**${bot.users.cache.get(o).tag}**`).join(", or ")} asap.`)
              });
        }
    })
    }
  }
})
  
    if(message.author.bot) return;
    if(!lvl) {
      return;
    } else {
  
  // XP System
  let amount = Math.ceil(Math.random() * 4) + 1;
  if(!user) {
      const newlevel = new userlevel({
      guildID: message.guild.id,
      userID: message.author.id,
      xp: amount,
      level: 1
    })
    newlevel.save()
  } else {
    let nextlevelxp = user.level * num;
    if(user.xp >= nextlevelxp) {
      user.level = user.level- + -1;
      user.xp = 0;
      user.save();
      if(levelch) {
        const levelChannel = message.guild.channels.cache.get(levelch.channelID)
        levelChannel.send(`GG **${message.author.tag}**, you have just advanced to level **${user.level}**!`)
      } else {
        message.channel.send(`GG **${message.author.tag}**, you have just advanced to level **${user.level}**!`)
      }
  } else {
      user.xp = user.xp- + -amount;
      user.save();
    }
  }
  }
if(!member) {
    const newcredits = new users({
        userID: message.author.id,
        guildID: message.guild.id
    })
    newcredits.save();
} else {
    member.balance = member.balance- + -1;
    member.save();
}
})
})
})
})
}