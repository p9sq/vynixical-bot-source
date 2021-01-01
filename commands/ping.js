const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const msg = await message.channel.send("⌛ Pinging...")

        let embed = new Discord.MessageEmbed()
        .setTitle("Pong! 🏓")
        .setDescription([
            `**Message:** \`${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms\``,
            `${bot.ws.ping ? `**Websocket:** \`${Math.round(bot.ws.ping)}ms\`` : ''}`,
            `**Total Shard(s):** \`${bot.ws.totalShards}\``
        ].join("\n"))
        .setColor(color)
        .setTimestamp()
        msg.edit(embed)
        msg.edit("")
}

module.exports.config = {
    name: "ping",
    description: "Shows the message edit, and the websocket latency",
    usage: "ping",
    category: "Fun",
    example: "ping",
    accessableby: "Everyone",
    aliases: ["pingpong", "latency", "ms"]
}