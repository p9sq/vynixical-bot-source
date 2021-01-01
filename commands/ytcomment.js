const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (bot, message, args) => {
    const text = args.join(" ")
    if(!text) return message.channel.send("Please provide a message!")
    const avatar = message.author.displayAvatarURL({dynamic: false, format: "png"})
    const username = message.author.username
    const image = await canvacord.Canvas.youtube({username: username, content: text, avatar: avatar, dark: true});
    const img = new Discord.MessageAttachment(image, "youtube.png")
    message.channel.send(img);

}

module.exports.config = {
    name: "ytcomment",
    description: "Fake youtube comment",
    usage: "ytcomment <text>",
    category: "Image",
    example: "ytcomment Hello World",
    accessableby: "Everyone",
    aliases: []
}