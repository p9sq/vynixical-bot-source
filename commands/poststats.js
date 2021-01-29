const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const DBL = require("dblapi.js");
const IBL = require("infinity-api");
const fetch = require("node-fetch");

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
    message.channel.send("<:allow:793205689753010217> **Successfully posted stats to all bot lists**")

    const dbl = new DBL(botconfig.apiTokens.topgg, bot);
    const stats = new IBL(bot.user.id, botconfig.apiTokens.ibl);

    stats.postStats(bot.guilds.cache.size, bot.shard.ids[0]);
    dbl.postStats(bot.guilds.cache.size, bot.shard.ids[0], bot.shard.ids.length);

    dbl.on("posted", () => {
        console.log("Server count posted!");
    });

    fetch("https://discord.bots.gg/api/v1/bots/725582436477698118/stats", {
        method: "POST",
        body: JSON.stringify({guildCount: bot.guilds.cache.size, shardCount: bot.shard.ids.length, shardId: bot.shard.ids[0]}),
        headers: {
            "Authorization": botconfig.apiTokens.dbots,
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(json => console.log(json));

    fetch("https://api.discordbots.co/v1/public/bot/725582436477698118/stats", {
        method: "POST",
        body: JSON.stringify({serverCount: bot.guilds.cache.size, shardCount: bot.shard.ids.length}),
        headers: {
            "Authorization": botconfig.apiTokens.vultrex,
             "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(json => console.log(json));
      
    fetch("https://cyclonebots.xyz/api/auth/stats/725582436477698118", {
        method: "POST",
        headers: {
            "Authorization": botconfig.apiTokens.cyclone,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"server_count": bot.guilds.cache.size})
    }).then(res => res.json()).then(json => console.log(json));
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