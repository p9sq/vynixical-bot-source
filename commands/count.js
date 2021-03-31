const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setDescription(`Intents (\`Presence Intent\` & \`Server Members Intent\`) haven't been whitelisted yet. So don't expect the information provided to be correct.`)
    .setColor(color)
    .addField("Statistics:", `\n\u3000 **Users:** ${bot.users.cache.size.toLocaleString()}
    \u3000 **Channels:** ${bot.channels.cache.size.toLocaleString()}
    \u3000 **Servers:** ${bot.guilds.cache.size.toLocaleString()}
    \u3000 **Emojis:** ${bot.emojis.cache.size}
    `);
  message.reply(embed);
};

module.exports.config = {
  name: "count",
  description: "Shows the cached users, channels, servers and emojis",
  usage: "count",
  category: "Info",
  example: "count",
  accessableby: "Everyone",
  aliases: [],
};
