const translate = require("translate-google");
const Discord = require("discord.js");
const { color, owners } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (!args.length)
    return message.channel.send("Please specify some text to translate.");

  translate(args.join(" "), { to: "en" })
    .then((res) => {
      const embed = new Discord.MessageEmbed()
        .setTitle("Success")
        .setColor(color)
        .addField("Original text", args.join(" "))
        .addField("Translated text", res);
      message.channel.send(embed);
    })
    .catch((err) => {
      message.channel.send(
        `Uh oh, an error has occurred while running the command. Error: **${err}**. Make sure to report this to ${owners
          .map((o) => `**${bot.users.cache.get(o).tag}**`)
          .join(", or ")} asap.`
      );
    });
};

module.exports.config = {
  name: "translate",
  description: "Translates the specified text to english",
  usage: "translate <text>",
  category: "Fun",
  example: "translate Hola amigo, como estas?",
  accessableby: "Everyone",
  aliases: [],
};
