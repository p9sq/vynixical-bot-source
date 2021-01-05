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
            shards: bot.ws.totalShards
        })
    }).then(async(res) => {
        const result = await res.json();
        const { error, message } = result;
        const statsEmbed = new MessageEmbed()
            if(error === true) {
                statsEmbed.setColor("RED")
                statsEmbed.addField("Error?", "Yes")
                statsEmbed.addField("Response", message)
            } else {
                statsEmbed.setColor("GREEN")
                statsEmbed.addField("Error?", "No")
                statsEmbed.addField("Response", message)
            }
            statsEmbed.setFooter(today.format("MMM Do YYYY"))
            statsEmbed.setTimestamp();
        iblHook.send(statsEmbed)
        // const statsEmbed = new MessageEmbed()
        //     .setColor(botconfig.color)
        //     .addField(`Posted Stats - ${today.format("MMM Do YYYY")}`, `\`\`\`json\n${result}\n\`\`\``)
        //     .setTimestamp();
        // iblHook.send(statsEmbed)
    })
}