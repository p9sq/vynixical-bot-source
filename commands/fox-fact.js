const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  const { body } = await superagent.get(`https://some-random-api.ml/facts/fox`);
  if (!body)
    return message.channel.send(
      "Uh oh, it looks like that there was no body to load. Please try again."
    );
  message.channel.send(body.fact);
};

module.exports.config = {
  name: "fox-fact",
  description: "Sends a random fox fact",
  usage: "fox-fact",
  category: "Info",
  example: "fox-fact",
  accessableby: "Everyone",
  aliases: [],
};
