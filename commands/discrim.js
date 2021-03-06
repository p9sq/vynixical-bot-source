const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const query = args[0];
  if (!query)
    return message.channel.send(
      "<:maybe:793205689153093702> **Please include a discriminator**"
    );

  const users = bot.users.cache
    .filter((user) => user.discriminator === query)
    .map((m) => m.tag);
  if (!users.length)
    return message.channel.send(
      `<:deny:793205689488900136> **No users found with discriminator #${query}**`
    );

  const embed = new Discord.MessageEmbed().setColor(botconfig.color);

  if (users.length > 2000) {
    embed.setDescription(
      `Over 2,000 users haven been found with discriminator **#${query}**`
    );
    return message.channel.send(embed);
  } else {
    embed.setDescription(users.join("\n"));
    return message.channel.send(embed);
  }
};

module.exports.config = {
  name: "discrim",
  description: "Searches for users with a certain discriminator",
  usage: "discrim <discriminator>",
  category: "Info",
  example: "discrim 0001",
  accessableby: "Everyone",
  aliases: ["discriminator"],
};
