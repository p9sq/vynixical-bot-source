const { stripIndents } = require("common-tags");

module.exports.run = async (bot, message, args) => {
    const msg = await message.channel.send("<a:Issue:748716275705839786> | Pinging...")

    const msgSpeed = (msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp);
    const websocketPing = Math.round(bot.ws.ping);
    const botShards = bot.ws.totalShards;
    const userPing = new Date().getTime() - msg.createdTimestamp;

    msg.edit(stripIndents`<a:IssueFixed:748716312058134588> | **Pong!**
    \`\`\`yaml
    Message: ${msgSpeed}ms
    Websocket: ${websocketPing}ms
    Your Ping: ${userPing}ms
    Total Shards: ${botShards}
    \`\`\``)
}

module.exports.config = {
    name: "ping",
    description: "Shows the message edit speed, websocket lantency, your ping, and the bots shards",
    usage: "ping",
    category: "Fun",
    example: "ping",
    accessableby: "Everyone",
    aliases: ["pingpong", "latency", "ms"]
}