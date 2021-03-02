const Discord = require("discord.js");
const {
  color,
  apiTokens: { ibl },
} = require("../botconfig.json");
const IBL = require("infinitybots.js");
const stats = new IBL("725582436477698118", ibl);

module.exports.run = async (bot, message, args) => {
  if (message.guild.id !== "758641373074423808")
    return message.channel.send(
      "**<:deny:793205689488900136> This command can only be used in Infinity Bot List**"
    );
  if (!args[0]) return message.channel.send("Please specify a user id!");
  if (isNaN(args[0]))
    return message.channel.send("That is not a valid user id!");
  stats.getUser(args[0], (data) => {
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(`${data.username} Stats`).setDescription(`
            **Nickname:** ${data.nickname},
            **About:** ${data.about},
            **Certified?:** ${data.certified_dev ? "Yes" : "No"},
            **Staff?:** ${data.staff ? "Yes" : "No"},
            **Developer?:** ${data.developer ? "Yes" : "No"},
            **Links:** [Website](${data.links.website})
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
