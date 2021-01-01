const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const attachment = new Discord.MessageAttachment('https://pics.me.me/chair-exe-has-stopped-working-40738183.png')
    message.channel.send("Chair.exe has stoped working :frowning:", attachment)
}

module.exports.config = {
    name: "chair.exe",
    description: "Shows a silly chair image",
    usage: "chair.exe",
    category: "Fun",
    example: "chair.exe",
    accessableby: "Everyone",
    aliases: ["c.e", "chairexe"]
}