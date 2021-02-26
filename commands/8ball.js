const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  const question = args.join(" ");
  if (!question)
    return message.channel.send("Please provide a question to ask the 8ball.");
  const responses = [
    "As I see it, yes.",
    "Ask again later.",
    "As I see it, yes.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "It is certain.",
    "It is decidedly so.",
    "Most likely.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Outlook good.",
    "Reply hazy, try again.",
    "Signs point to yes.",
    "Very doubtful.",
    "Without a doubt.",
    "Yes.",
    "Yes – definitely.",
    "You may rely on it.",
  ];
  const response = responses[Math.floor(Math.random() * responses.length)];
  const embed = new Discord.MessageEmbed()
    .setTitle("The Magic 8Ball has spoken")
    .setColor(color)
    .addField("Question:", question, true)
    .addField("Response:", response, true);
  message.channel.send(embed);
};

module.exports.config = {
  name: "8ball",
  description: "Asks the 8ball a question of your choice",
  usage: "8ball <question>",
  category: "Fun",
  example: "8ball is this bot cool?",
  accessableby: "Everyone",
  aliases: ["eightball", "8b"],
};
