const Discord = require("discord.js");
const mutedRole = require("../models/mute");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    const Member = message.mentions.users.last();
    const member = message.mentions.members.last();
    let reason = args.slice(2).join(" ")
    if(!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("<:maybe:793205689153093702> **I am missing the Manage Guild permission**")
    if(!message.member.hasPermission("MANAGE_GUILD")) {
      const invalidEmbed = new Discord.MessageEmbed()
        .setTitle("Invalid Permissions!")
        .addField("Permissions Required:", "Manage Guild")
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
      message.channel.send(invalidEmbed);
    } else {
      if(!member) return  message.channel.send("Please mention a user!")
        if(!reason) reason = "No reason provided"
        if(!args[1]) {
          message.channel.send(`<:deny:793205689488900136> **You didn't specify your time**`)
        }
        if(!args[1].endsWith("d")&&!args[1].endsWith("h")&&!args[1].endsWith("m")&&!args[1].endsWith("s")) {
          message.channel.send(`<:deny:793205689488900136> **You didn't the correct formatting for your time**`)
        }
        if(isNaN(args[1][0])) {
          message.channel.send(`<:deny:793205689488900136> **That is not a number**`)
        } else {
          mutedRole.findOne({ guildID: message.guild.id } , ( err , m ) => {
            member.roles.add(m.muteID);
            let formatedTime;
            const Time = args[1].split("").reverse().slice(1).reverse().join("")
            if(args[1].endsWith("h")) {
              formatedTime = `${Time} Hours`
            } else if(args[1].endsWith("d")) {
              formatedTime = `${Time} Days`
            } else if(args[1].endsWith("m")) {
              formatedTime = `${Time} Minutes`
            } else if(args[1].endsWith("s")) {
              formatedTime = `${Time} Seconds`
            }
            message.channel.send(`<:allow:793205689753010217> **${Member.tag} has been temporarily muted for ${formatedTime} for ${reason}**`)

            setTimeout( function () {
                member.roles.remove(m.muteID)
                message.channel.send(`<:allow:793205689753010217> **${Member.tag} has been unmuted**`)
            }, ms(args[1]))
      })
        }
      }
}

module.exports.config = {
    name: "tempmute",
    description: "Temporarily mutes a mentioned user with a reason",
    usage: "tempmute <user> <time> [reason]",
    category: "Moderation",
    example: "tempmute @Wumpus#0001 10m Don't flood general chats",
    accessableby: "Admins",
    aliases: ["tempmuteuser", "tempmutemember"]
}