const Discord = require("discord.js");
const math = require("mathjs");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let resp;
  try {
    resp = math.evaluate(args.join(" "));
  } catch (error) {
    return message.channel.send(
      `<:maybe:793205689153093702> **${error.message}**`
    );
  }
  if (!args.join(" "))
    return message.channel.send("Please provide a maths calculation!");
  let embed = new Discord.MessageEmbed()
    .addField("Question:", "```js\n" + args.join(" ") + "```")
    .addField("Answer:", "```js\n" + resp + "```")
    .setColor(color);
  message.channel.send(embed);
};

module.exports.config = {
  name: "calculate",
  description: "Calculates any number together",
  usage: "calculate <number> <symbol> <number>",
  category: "Info",
  example: "calculate 2+2",
  accessableby: "Everyone",
  aliases: ["calc"],
};
