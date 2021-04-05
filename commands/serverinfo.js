// const Discord = require("discord.js");
// const moment = require("moment");
// const { color } = require("../botconfig.json");

// const filterLevels = {
//   DISABLED: "Off",
//   MEMBERS_WITHOUT_ROLES: "No Role",
//   ALL_MEMBERS: "Everyone",
// };
// const verificationLevels = {
//   NONE: "None",
//   LOW: "Low",
//   MEDIUM: "Medium",
//   HIGH: "(╯°□°）╯︵ ┻━┻",
//   VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
// };
// const regions = {
//   brazil: "Brazil",
//   europe: "Europe",
//   hongkong: "Hong Kong",
//   india: "India",
//   japan: "Japan",
//   russia: "Russia",
//   singapore: "Singapore",
//   southafrica: "South Africa",
//   sydney: "Sydney",
//   "us-central": "US Central",
//   "us-east": "US East",
//   "us-west": "US West",
//   "us-south": "US South",
// };

module.exports.run = async (bot, message, args) => {
  return message.reply("Hey there. My intents haven't been whitelisted yet. So some of these commands/events/features wont function properly. If you think this is an error/issuel, feel free to DM my developer (p9sq#2041). Sorry for the inconvenience, I hope you understand.", { allowedMentions: { repliedUser: false }});
  // const roles = message.guild.roles.cache
  //   .sort((a, b) => b.position - a.position)
  //   .map((role) => role.toString());
  // const members = message.guild.members.cache;
  // const channels = message.guild.channels.cache;
  // const emojis = message.guild.emojis.cache;

  // const embed = new Discord.MessageEmbed()
  //   .setDescription(`**Guild information for __${message.guild.name}__**`)
  //   .setColor(color)
  //   .setThumbnail(
  //     message.guild.iconURL({ dynamic: true, format: "png", size: 2048 })
  //   )
  //   .addField("General", [
  //     `**Name:** ${message.guild.name}`,
  //     `**ID:** ${message.guild.id}`,
  //     `**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
  //     `**Region:** ${regions[message.guild.region]}`,
  //     `**Boost Tier:** ${
  //       message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : "None"
  //     }`,
  //     `**Explicit Filter:** ${
  //       filterLevels[message.guild.explicitContentFilter]
  //     }`,
  //     `**Verification Level:** ${
  //       verificationLevels[message.guild.verificationLevel]
  //     }`,
  //     `**Time Created:** ${moment(message.guild.createdTimestamp).format(
  //       "LT"
  //     )}, ${moment(message.guild.createdTimestamp).format("LL")}, ${moment(
  //       message.guild.createdTimestamp
  //     ).fromNow()}`,
  //   ])
  //   .addField("Statistics", [
  //     `**Role Count:** ${roles.length}`,
  //     `**Emoji Count:** ${emojis.size}`,
  //     `**Regular Emoji Count:** ${
  //       emojis.filter((emoji) => !emoji.animated).size
  //     }`,
  //     `**Animated Emoji Count:** ${
  //       emojis.filter((emoji) => emoji.animated).size
  //     }`,
  //     `**Member Count:** ${message.guild.memberCount}`,
  //     `**Humans:** ${members.filter((member) => !member.user.bot).size}`,
  //     `**Bots:** ${members.filter((member) => member.user.bot).size}`,
  //     `**Text Channels:** ${
  //       channels.filter((channel) => channel.type === "text").size
  //     }`,
  //     `**Voice Channels:** ${
  //       channels.filter((channel) => channel.type === "voice").size
  //     }`,
  //     `**Boost Count:** ${message.guild.premiumSubscriptionCount || "0"}`,
  //   ])
  //   .addField("Presence", [
  //     `**Online:** ${
  //       members.filter((member) => member.presence.status === "online").size
  //     }`,
  //     `**Idle:** ${
  //       members.filter((member) => member.presence.status === "idle").size
  //     }`,
  //     `**Do Not Disturb:** ${
  //       members.filter((member) => member.presence.status === "dnd").size
  //     }`,
  //     `**Offline:** ${
  //       members.filter((member) => member.presence.status === "offline").size
  //     }`,
  //   ])
  //   .addField(
  //     `Roles [${roles.length - 1}]:`,
  //     roles.length < 10
  //       ? roles.join(", ")
  //       : roles.length > 10
  //       ? bot.utils.trimArray(roles)
  //       : "None"
  //   )
  //   .setTimestamp()
  //   .setFooter(
  //     "Guild info",
  //     message.guild.iconURL({ format: "png", size: 2048, dynamic: true })
  //   );
  // if (message.guild.banner) {
  //   embed.setImage(message.guild.banner);
  // }
  // message.channel.send(embed);
};

module.exports.config = {
  name: "serverinfo",
  description: "Shows the servers info",
  usage: "serverinfo",
  category: "Info",
  example: "serverinfo",
  accessableby: "Everyone",
  aliases: ["guildinfo", "si"],
};
