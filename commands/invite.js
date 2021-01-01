const Discord = require("discord.js");
const { color } = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.MessageEmbed()
    .setTitle("Invites")
    .setColor(color)
    .setDescription(`
    > **Administator:**
    [Click Me](https://discord.com/api/oauth2/authorize?client_id=725582436477698118&permissions=8&scope=bot)
    > **Some Permissions:**
    [Click Me](https://discord.com/oauth2/authorize?client_id=725582436477698118&scope=bot&permissions=805424215)
    > **No Permissions:**
    [Click Me](https://discord.com/api/oauth2/authorize?client_id=725582436477698118&permissions=0&scope=bot)
    `)
    .setTimestamp()
    message.channel.send(embed)
}

module.exports.config = {
    name: "invite",
    description: "Sends an invite link for the bot",
    usage: "invite",
    category: "Fun",
    example: "invite",
    accessableby: "Everyone",
    aliases: ["invlink", "invitelink"]
}