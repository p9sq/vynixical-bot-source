const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
  const query = args.join(" ");
  if (!query) return message.channel.send("Please specify a search query!");
  const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
    query
  )}`;

  const docFetch = await fetch(url);
  const embed = await docFetch.json();

  if (!embed || embed.error) {
    return message.channel.send(
      `<:maybe:793205689153093702> **"${query}" couldn't be located within the discord.js documentation!** (<https://discord.js.org/>)`
    );
  }

  const msg = await message.channel.send({ embed });
  msg.react("🗑");

  let react;
  try {
    react = await msg.awaitReactions(
      (reaction, user) =>
        reaction.emoji.name === "🗑" && user.id === message.author.id,
      { max: 1, time: 10000, errors: ["time"] }
    );
  } catch (error) {
    msg.reactions.removeAll();
  }

  if (react && react.first()) msg.delete();

  return message;
};

module.exports.config = {
  name: "discordjs",
  description: "Search the discord.js docs",
  usage: "discordjs [query]",
  category: "Info",
  example: "discordjs ClientUser",
  accessableby: "Everyone",
  aliases: ["djs-docs", "docs"],
};
