const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        
        return `
        Days: \`${days.padStart(1, '0')}\`
        Hours: \`${hrs.padStart(2, '0')}\`
        Minutes: \`${min.padStart(2, '0')}\`
        Seconds: \`${sec.padStart(2, '0')}\`
        `
    }

    let embed = new Discord.MessageEmbed()
    embed.setColor(color)
    embed.setDescription(`${duration(bot.uptime)}`)
    embed.setAuthor(`${bot.user.username} uptime`, bot.user.displayAvatarURL())
    message.channel.send(embed)
}

module.exports.config = {
    name: "uptime",
    description: "Shows how long the bot has been online for",
    usage: "uptime",
    category: "Info",
    example: "uptime",
    accessableby: "Everyone",
    aliases: ["botuptime", "ut"]
}