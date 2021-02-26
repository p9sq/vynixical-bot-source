module.exports.run = async (bot, message, args) => {
  const clap = args.join(" 👏 ");
  if (!clap) return message.channel.send("Please provide a message to clap!");
  message.channel.send(`👏 ${clap} 👏`);
};

module.exports.config = {
  name: "clap",
  description: "Claps a message",
  usage: "clap <message>",
  category: "Fun",
  example: "clap Hello World",
  accessableby: "Everyone",
  aliases: ["clapmsg", "msgclap"],
};
