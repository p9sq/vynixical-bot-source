const botconfig = require("./botconfig.json");
const fetch = require("node-fetch");

module.exports = async (bot) => {
    fetch(`https://infinitybotlist.com/api/bots/725582436477698118`, {
        method: "POST",
        headers: {
            "authorization": botconfig.iblApiToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            servers: bot.guilds.cache.size,
            shards: bot.ws.totalShards
        })
    }).then(async res => console.log(await res.json()))
}