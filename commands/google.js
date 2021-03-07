const Discord = require("discord.js");
const request = require("node-fetch");
const { color, googleKeys } = require("../botconfig.json");
const apiKey = googleKeys[0];

module.exports.run = async (bot, message, args) => {
  const csx = "9d37a2551cd0274a3";
  const query = args.join(" ");
  let result;

  if (!query) return message.channel.send("Please input the query to search.");

  href = await search(query);
  if (!href) return message.channel.send("Unknown search.");

  const embed = new Discord.MessageEmbed()
    .setTitle(href.title)
    .setDescription(href.snippet)
    .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
    .setURL(href.link)
    .setColor(color)
    .setFooter("Powered by Google");
  return message.channel.send(embed);

  async function search(query) {
    const { body } = await request
      .get("https://www.googleapis.com/customsearch/v1")
      .query({
        key: apiKey,
        cx: csx,
        safe: "off",
        q: query,
      });

    if (!body.items) return null;
    return body.items[0];
  }
};

module.exports.config = {
  name: "google",
  description: "Googles the specified query",
  usage: "google <query>",
  category: "Fun",
  example: "google Vynixical",
  accessableby: "Everyone",
  aliases: ["googlesearch", "gs", "search"],
};
