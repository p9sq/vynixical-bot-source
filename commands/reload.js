const Discord = require("discord.js");
const { owners } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
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

    if(!args[0]) return message.channel.send("<:maybe:793205689153093702> **Please specify a command to reload**")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`<:deny:793205689488900136> **Failed to reload ${args[0].toLowerCase()} command**`)
    }

    message.channel.send(`<:allow:793205689753010217> **Successfully reloaded ${args[0].toLowerCase()} command**`)
}
}

module.exports.config = {
    name: "reload",
    description: "Reloads a command",
    usage: "reload <command>",
    category: "Developer",
    example: "reload eval",
    accessableby: "Developer",
    aliases: ["reloadcmd", "rc", "reloadcommand"]
}