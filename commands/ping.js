const { stripIndents } = require("common-tags");
const mongoose = require("mongoose");

module.exports.run = async (bot, message, args) => {
    const msg = await message.channel.send("<a:Issue:748716275705839786> | Pinging...")

    const msgSpeed = (msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp);
    const websocketPing = Math.round(bot.ws.ping);
    const currentShard = bot.shard.ids[0];
    const userPing = new Date().getTime() - msg.createdTimestamp;

    ping();

    async function ping() {
        const start = Date.now();
        await mongoose.connection.db.admin().ping();
        const end = Date.now() - start;

        msg.edit(stripIndents`<a:IssueFixed:748716312058134588> | **Pong!**
        \`\`\`yaml
        Message: ${msgSpeed}ms
        Websocket: ${websocketPing}ms
        Database: ${end}ms
        Your Ping: ${userPing}ms
        Current Shard Id: #${currentShard}
        \`\`\``)
    }
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