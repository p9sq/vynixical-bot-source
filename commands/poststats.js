const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const DBL = require("dblapi.js");
const IBL = require("infinity-api");

module.exports.run = async (bot, message, args) => {
  if(!botconfig.owners.includes(message.author.id)) {
  message.react("710703782887161898")
  const embed = new Discord.MessageEmbed()
    .setTitle("❌ Access Denied!")
    .setDescription("You aren't the owner of this bot!")
    .setColor("RED")
    .setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
    .setTimestamp()
  message.channel.send(embed)
  } else {
    const dbl = new DBL(botconfig.apiTokens.topgg, bot);
    const stats = new IBL(bot.user.id, botconfig.apiTokens.ibl);

    stats.postStats(bot.guilds.cache.size, bot.shard.ids[0]);

    dbl.on("posted", () => {
        console.log("Server count posted!");
    });

    fetch(`https://discord.bots.gg/api/v1/bots/725582436477698118/stats`, {
        method: "POST",
        Authorization: botconfig.apiTokens.dbots,
        headers: {
            "Content-Type": "application/json"
        }
    })
  }
}

module.exports.config = {
    name: "poststats",
    description: "Posts stats to all bot lists",
    usage: "poststats",
    category: "Developer",
    example: "poststats",
    accessableby: "Developer",
    aliases: ["ps", "post"]
}