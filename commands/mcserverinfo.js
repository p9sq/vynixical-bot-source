const util = require("minecraft-server-util");
const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send("Please specify a minecraft server ip.");
    if(!args[1]) return message.channel.send("Please specify a minecrafy server port.");

    util.status(args[0], {port: parseInt(args[1])}).then((res) => {
        console.log(res)
        // const embed = new Discord.MessageEmbed()
        //     .setColor(botconfig.color)
        //     .setTitle("Minecraft Server Info")
    }).catch((err) => {
        message.channel.send(`Uh oh, an error has ocurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners.map(o => `**${bot.users.cache.get(o).tag}**`).join(", or ")} asap.`)
    })
}

module.exports.config = {
    name: "mcserverinfo",
    description: "Shows info on a minecraft server",
    usage: "mcserverinfo <mc-ip> <mc-port>",
    category: "Info",
    example: "mcserverinfo mc.hypixel.next 25565",
    accessableby: "Everyone",
    aliases: ["mcs", "minecraftserverinfo"]
}