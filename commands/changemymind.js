const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (bot, message, args) => {
        if(!args.join(" ")) return message.channel.send("Please provide a message!")
        let image = await canvacord.Canvas.changemymind(args.join(" "));
        const img = new Discord.MessageAttachment(image, "changemymind.png")
        message.channel.send(img);

}

module.exports.config = {
    name: "changemymind",
    description: "Changes your mind",
    usage: "changemymind <text>",
    category: "Image",
    example: "changemymind Hello World",
    accessableby: "Everyone",
    aliases: []
}