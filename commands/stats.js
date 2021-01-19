const fetch = require("node-fetch");
const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(message.guild.id !== "758641373074423808") return message.channel.send("**<:deny:793205689488900136> This command can only be used in Infinity Bot List**")
    const botMention = message.mentions.users.first();
    if(!botMention.bot) return message.channel.send("That user isn't a bot!")
    if(!botMention) return message.channel.send("Please mention a bot!")
    fetch(`https://infinitybotlist.com/api/bots/${botMention.id}/info`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async res => {
	console.log(await res.json());
        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(res.bot_name)
            .setDescription(`
            **Votes:** ${res.votes},
            **Support:** ${res.support},
            **Website:** ${res.website},
            **Donate:** ${res.donate},
            **Certified:** ${res.certified ? "Yes" : "No"},
            **Tags:** ${res.tags}
            **Prefix:** ${res.prefix},
            **Library:** ${res.library},
            **Description:** ${res.short_desc},
            **Servers:** ${res.servers},
            **Shards:** ${res.shards},
            **Staff:** ${res.staff ? "Yes" : "No"}
            `)
            .setFooter(`Bot created by ${res.owner}`)
        message.channel.send(embed)
    });
}

module.exports.config = {
    name: "stats",
    description: "Gets the stats on a bot from IBL",
    usage: "stats <bot>",
    category: "Info",
    example: "stats @Vynixical#0874",
    accessableby: "Everyone",
    aliases: ["iblstats"]
}