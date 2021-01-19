const Discord = require("discord.js");
const { owners } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const channelID = message.guild.channels.cache.get(args[0])
    if(!owners.includes(message.author.id)) {
        message.react("710703782887161898")
        const embed = new Discord.MessageEmbed()
            .setTitle("❌ Access Denied!")
            .setDescription("You aren't the owner of this bot!")
            .setColor("RED")
            .setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
            .setTimestamp()
        message.channel.send(embed)
        } else {
    if(!channelID) return message.reply("Please provide a voice channel id, not a text channel id!")
        message.channel.send(`<:check:314349398811475968> Successfully left the <#${channelID}> voice channel!`)
        channelID.leave();
    }
}

module.exports.config = {
    name: "leavevc",
    description: "Leaves a voice channel by id",
    usage: "leavevc <channel id>",
    category: "Developer",
    example: "leavevc 692883223184670760",
    accessableby: "Developer",
    aliases: ["vcleave", "disconnectvc"]
}