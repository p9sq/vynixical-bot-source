const botconfig = require("../botconfig.json");
const DBL = require("dblapi.js");
const IBL = require("infinity-api");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
  if(!botconfig.owners.includes(message.author.id)) {
  return
  } else {
    const msg = await message.channel.send("<a:loading:393852367751086090> | Posting...");

    const dbl = new DBL(botconfig.apiTokens.topgg, bot);
    const stats = new IBL(bot.user.id, botconfig.apiTokens.ibl);

    stats.postStats(bot.guilds.cache.size, bot.shard.count);
    dbl.postStats(bot.guilds.cache.size, bot.shard.ids[0], bot.shard.count);

    dbl.on("posted", () => {
        console.log("Server count posted!");
    });

    fetch("https://discord.bots.gg/api/v1/bots/725582436477698118/stats", {
        method: "POST",
        body: JSON.stringify({guildCount: bot.guilds.cache.size, shardCount: bot.shard.count, shardId: bot.shard.ids[0]}),
        headers: {
            "Authorization": botconfig.apiTokens.dbots,
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(json => console.log(json));

    fetch("https://api.discordbots.co/v1/public/bot/725582436477698118/stats", {
        method: "POST",
        body: JSON.stringify({serverCount: bot.guilds.cache.size, shardCount: bot.shard.count}),
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

    fetch("https://fateslist.xyz/api/bots/725582436477698118/stats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "api_token": botconfig.apiTokens.fates,
            "guild_count": bot.guilds.cache.size,
            "shard_count": bot.shard.count
        })
    }).then(res => res.json()).then(json => console.log(json));

    msg.edit("<:allow:793205689753010217> **Successfully posted stats to all bot lists**");
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
