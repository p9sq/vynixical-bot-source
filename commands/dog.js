const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  const { body } = await superagent.get(`https://some-random-api.ml/img/dog`);
  if (!body)
    return message.channel.send(
      "Uh oh, it looks like that there was no body to load. Please try again."
    );
  const img = new Discord.MessageAttachment(body.link);
  message.channel.send(img);
};

module.exports.config = {
  name: "dog",
  description: "Shows a random dog image",
  usage: "dog",
  category: "Animals",
  example: "dog",
  accessableby: "Everyone",
  aliases: [],
};
