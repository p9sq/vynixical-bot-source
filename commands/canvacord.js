const Docs = require("snowflake-studio-docs");

module.exports.run = async (bot, message, args) => {
  if (!args.join(" "))
    return message.channel.send("Please specify a search query!");
  const query = args[0];
  Docs.fetch("canvacord").then((doc) => {
    const embed = doc.resolveEmbed(query, { excludePrivateElements: true });
    message.channel.send({ embed });
  });
};

module.exports.config = {
  name: "canvacord",
  description: "Search the canvacord docs",
  usage: "canvacord [query]",
  category: "Info",
  example: "canvacord Rank",
  accessableby: "Everyone",
  aliases: [],
};
