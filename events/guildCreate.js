const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports = async (bot, server) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(server.name, server.iconURL({dynamic: true}))
        .setDescription(`Bot is now at ${bot.guilds.cache.size} servers!`)
        .setFooter(`Server Owner: ${bot.users.cache.get(server.owner.id).tag}`)
        .setColor("GREEN")
    bot.channels.cache.get("803068437114781696").send(`${botconfig.owners.map(owner => bot.users.cache.get(owner)).join(" ")} | **New guild found!**`, embed)
}