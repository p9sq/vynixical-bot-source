const botconfig = require("./botconfig.json");
const { WebhookClient, MessageEmbed } = require("discord.js");
const iblHook = new WebhookClient("795090307698917418", "9AfFUCOMFwMct0WfodH8CV2fWn-hohHsAr2Qk2Mdke6qrmz3bFVh7QXTFM5mHIZBhOa6");
const moment = require("moment");
const today = moment();

module.exports = async (bot) => {
    const fetch = require("node-fetch")
    fetch(`https://infinitybotlist.com/api/bots/725582436477698118`, {
        method: "POST",
        headers: {
            "authorization": botconfig.iblApiToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            servers: bot.guilds.cache.size,
            shards: bot.shard.ids[0]
        })
    }).then(async(res) => {
        const result = await res.json()
        const statsEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Posted Stats")
            .addField("Amount of servers:", bot.guilds.cache.size)
            .addField("Amount of shards:", bot.shard.ids[0])
            .setDescription(`\`\`\`json\n${result}\n\`\`\``)
            .setTimestamp();
        iblHook.send(statsEmbed)
    })
}