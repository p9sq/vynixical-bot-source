const translate = require("@k3rn31p4nic/google-translate-api");
const Discord = require("discord.js");
const { color, owners } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  const language = args[0];
  const text = args.slice(1).join(" ");

  if (!language)
    return message.channel.send(
      "Please specify the language you are translating to."
    );
  if (!text)
    return message.channel.send("Please specify some text to translate.");
  if (language.lengh < 2)
    return message.channel.send(
      "Please specify a proper language alias. (E.g. **English** > **en**)"
    );

  translate(text, { to: language })
    .then((res) => {
      const embed = new Discord.MessageEmbed()
        .setTitle("Success")
        .setColor(color)
        .addField("Original", text)
        .addField("Translated", res.text);
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
  usage: "translate <language> <text>",
  category: "Fun",
  example: "translate en Hola amigo, como estas?",
  accessableby: "Everyone",
  aliases: [],
};
