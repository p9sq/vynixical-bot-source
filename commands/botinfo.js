const Discord = require("discord.js");
const moment = require("moment");
const guildprefix = require("../models/prefix");
const banner = require("../models/banner");
const { owners, color } = require("../botconfig.json");
const { version } = require("../package.json");
const os = require("os");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let core = os.cpus()[0]
    let embed = new Discord.MessageEmbed()
    guildprefix.findOne({ guildID: message.guild.id, guildName: message.guild.name, guildOwner: message.guild.owner.user.tag}, (err, data) => {
    banner.findOne({}, (err, img) => {
        embed.setThumbnail(`${bot.user.avatarURL({size: 4096, format: "png"})}`)
        embed.setColor(color)
        embed.setImage(img.image)
        embed.addField("General", [
            `**Client:** ${bot.user.tag} (${bot.user.id})`,
            `**Commands:** ${bot.commands.size}`,
            `**Servers:** ${bot.guilds.cache.size.toLocaleString()}`,
            `**Users:** ${bot.users.cache.size.toLocaleString()}`,
            `**Channels:** ${bot.channels.cache.size.toLocaleString()}`,
            `**Emojis:** ${bot.emojis.cache.size.toLocaleString()}`,
            `**Creation Date:** ${moment.utc(bot.user.createdTimestamp).format("Do MMMM YYYY HH:mm:ss")}`,
            `**Node.js:** ${process.version}`,
            `**Version:** v${version}`,
            `**Discord.js:** v${Discord.version}`,
            `**Uptime:** ${bot.utils.duration(bot.uptime)}`,
            `**Description:** This bot was made by ${bot.users.cache.get(owners[0])}. This bot has heaps of commands to use!`,
            `**Libary:** Discord.js`,
            `**Total Shard(s):** ${bot.ws.totalShards}`,
            `**Owners:**`,
            `${owners.map(o => `\u3000 ${bot.users.cache.get(o)} (${bot.users.cache.get(o).id})`).join("\n")}`,
        ])
        embed.addField("System", [
            `**Architecture:** ${os.arch()}`,
            `**Platform:** ${bot.utils.capitalizeFirstLetter(process.platform)}`,
            `**Uptime:** ${ms(os.uptime() * 1000, {long: true})}`,
            `**Time since last restart:** ${process.uptime().toFixed(2)}s`,
            `**CPU:**`,
            `\u3000 Cores: ${os.cpus().length}`,
            `\u3000 Model: ${core.model}`,
            `\u3000 Speed: ${core.speed}Mhz`,
            `**Memory:**`,
            `\u3000 Total: ${bot.utils.formatBytes(process.memoryUsage().heapTotal)}`,
            `\u3000 Used: ${bot.utils.formatBytes(process.memoryUsage().heapUsed)}`,
        ])
        embed.setFooter(`${bot.user.username} info`, bot.user.displayAvatarURL({format: "png"}))
        embed.setTimestamp()
    message.channel.send(embed)
        })
    })
}

module.exports.config = {
    name: "botinfo",
    description: "Shows the bots information",
    usage: "botinfo",
    category: "Info",
    example: "botinfo",
    accessableby: "Everyone",
    aliases: ["infobot", "bi"]
}