const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        let invalidEmbed = new Discord.MessageEmbed()
        .setTitle("Invalid Permissions!")
        .addField("Permissions Required:", "Administrator")
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
        message.channel.send(invalidEmbed);
    } else {
        let desc = args.slice(1).join(" ")
        const mChannel = message.mentions.channels.first();
        if(!mChannel) return message.channel.send("Please mention a channel!")
        if(!desc) return message.channel.send("Please specify a message to announce")
        message.delete()
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle("New Vote!")
        .addField("Vote:", desc)
        .setColor(color)
        .setThumbnail('https://cdn.discordapp.com/attachments/687131629176619205/727798407451639808/Vote.png')
        .setTimestamp()
        message.channel.send("", embed).then(async msg => {
        await msg.react('👍')
        await msg.react('👎')
        })
        }
}

module.exports.config = {
    name: "vote",
    description: "Creates an announcement and reacts to the message",
    usage: "vote <channel> <message>",
    category: "Moderation",
    example: "vote Discord.js or Discord.py?",
    accessableby: "Admins",
    aliases: ["poll", "newvote"]
}