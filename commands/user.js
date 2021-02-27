const Discord = require("discord.js");
const { color } = require("../botconfig.json");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
  if (message.guild.id !== "758641373074423808")
    return message.channel.send(
      "**<:deny:793205689488900136> This command can only be used in Infinity Bot List**"
    );
  if (!args[0]) return message.channel.send("Please specify a user id!");
  if (isNaN(args[0]))
    return message.channel.send("That is not a valid user id!");
  fetch(`https://api.infinitybots.xyz/user/${args[0]}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const stats = await res.json();
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(`${stats.username} Stats`).setDescription(`
            **Nickname:** ${stats.nickname},
            **About:** ${stats.about},
            **Certified?:** ${stats.certified_dev ? "Yes" : "No"},
            **Staff?:** ${stats.staff ? "Yes" : "No"},
            **Developer?:** ${stats.developer ? "Yes" : "No"},
            **Links:** [Website](${stats.links.website})
            `);
    message.channel.send(embed);
  });
};

module.exports.config = {
  name: "user",
  description: "Gets the stats on a user from IBL",
  usage: "stats <user-id>",
  category: "Info",
  example: "user 490064230717063195",
  accessableby: "Everyone",
  aliases: ["ibluser"],
};
