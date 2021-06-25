const Discord = require("discord.js");
const moment = require("moment");
const { color } = require("../botconfig.json");

const flags = {
  DISCORD_EMPLOYEE: "Discord Employee",
  DISCORD_PARTNER: "Discord Partner",
  BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
  BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
  HYPESQUAD_EVENTS: "HypeSquad Events",
  HOUSE_BRAVERY: "House of Bravery",
  HOUSE_BRILLIANCE: "House of Brilliance",
  HOUSE_BALANCE: "House of Balance",
  EARLY_SUPPORTER: "Early Supporter",
  TEAM_USER: "Team User",
  SYSTEM: "System",
  VERIFIED_BOT: "Verified Bot",
  VERIFIED_DEVELOPER: "Verified Bot Developer",
};

const statuses = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible",
  streaming: "Streaming",
};

module.exports.run = async (bot, message, args) => {
  return message.reply(
    `Hey there. My intents haven't been whitelisted yet. So some of these commands/events/features wont function properly. If you think this is an error/issue, feel free to DM my developer (${
      bot.users.cache.get(require("../botconfig.json").owners[0]).tag
    }). Sorry for the inconvenience, I hope you understand.`,
    { allowedMentions: { repliedUser: false } }
  );
  const user =
    message.mentions.users.last() ||
    message.author ||
    bot.users.cache.get(args[0]);
  const member =
    message.mentions.members.last() ||
    message.member ||
    message.guild.members.cache.get(args[0]);
  const roles = member.roles.cache
    .sort((a, b) => b.position - a.position)
    .map((role) => role.toString())
    .slice(0, -1);
  const userFlags = member.user.flags.toArray();
  const embed = new Discord.MessageEmbed()
    .setThumbnail(
      member.user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 })
    )
    .setColor(member.displayHexColor || color)
    .addField("User", [
      `**Username:** ${user.username}`,
      `**Discriminator:** ${user.discriminator}`,
      `**ID:** ${user.id}`,
      `**Flags:** ${
        userFlags.length
          ? userFlags.map((flag) => flags[flag]).join(", ")
          : "None"
      }`,
      `**Avatar:** [Link to avatar](${user.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 2048,
      })})`,
      `**Time Created:** ${moment(user.createdTimestamp).format(
        "LT"
      )}, ${moment(user.createdTimestamp).format("LL")}, ${moment(
        user.createdTimestamp
      ).fromNow()}`,
      `**Status:** ${statuses[user.presence.status]}`,
      `**Game:** ${user.presence.game || "Not playing a game"}`,
    ])
    .addField("Member", [
      `**Highest Role:** ${
        member.roles.highest.id === message.guild.id
          ? "None"
          : member.roles.highest.name
      }`,
      `**Server Join Date:** ${moment(member.joinedTimestamp).format(
        "LL LTS"
      )}`,
      `**Hoist Role:** ${
        member.roles.hoist ? member.roles.hoist.name : "None"
      }`,
      `**Roles [${roles.length}]:** ${
        roles.length < 10
          ? roles.join(", ")
          : roles.length > 10
          ? bot.utils.trimArray(roles)
          : "None"
      }`,
    ])
     .setFooter(
      "User info",
      member.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true })
    )
    .setTimestamp();
  message.channel.send(embed);
};

module.exports.config = {
  name: "userinfo",
  description: "Shows the mentioned users info",
  usage: "userinfo [user]",
  category: "Info",
  example: "userinfo @Wumpus#0001",
  accessableby: "Everyone",
  aliases: ["memberinfo", "ui"],
};
