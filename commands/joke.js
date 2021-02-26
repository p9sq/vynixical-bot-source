const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports.run = async (bot, message, args) => {
  const data = await random.getJoke();
  message.channel.send(data);
};

module.exports.config = {
  name: "joke",
  description: "Sends a fresh joke",
  usage: "joke",
  category: "Fun",
  example: "joke",
  accessableby: "Everyone",
  aliases: ["funnyjoke", "jokes"],
};
