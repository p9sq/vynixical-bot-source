const Discord = require("discord.js");
const { color } = require("../botconfig.json");

const botlists = [
  "Botrix",
  "Cyclone Bot List",
  "Discord Bots",
  "Glenn Bot List",
  "Infinity Bot List",
  "MatrixBots",
  "Tropical Bot List",
  "Vultrex Development",
];

module.exports.run = async (bot, message, args) => {
  const list = botlists.join("\n");
  const embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("Bot lists I am in")
    .setDescription(list)
    .setTimestamp()
    .setImage(
      "https://infinitybotlist.com/bots/725582436477698118/widget?size=large"
    );
  message.channel.send(embed);
};

module.exports.config = {
  name: "botlists",
  description: "Shows all of the botlists the bot is currently in",
  usage: "botlists",
  category: "Info",
  example: "botlists",
  accessableby: "Everyone",
  aliases: [],
};
