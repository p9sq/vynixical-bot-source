const Discord = require("discord.js");
const request = require("request");

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send("Please specify an image url.");
    if(!args[0].startsWith("https://")) return message.channel.send("Please provide a full image url with `https://` at the beginning.");
    const image = args[0].toString();
    request.post({
        url: "https://api.remove.bg/v1.0/removebg",
        formData: {
            image_file: args[0],
            size: "auto",
        },
        headers: {
          "X-Api-Key": "BBy8wMri5wkXP5F9xLfu9BJf"
        },
        encoding: null
      }, function(error, response, body) {
        if(error) return message.channel.send(`Request failed: \`${error}\``);
        if(response.statusCode != 200) return message.channel.send(`Error: \`${response.statusCode, body.toString("utf8")}\``);
        message.channel.send(new Discord.MessageAttachment("no-bg.png", body));
    });
}

module.exports.config = {
    name: "removebg",
    description: "Removes the background of an image",
    usage: "removebg https://example-image-url.png",
    category: "Image",
    example: "removebg https://cdn.discordapp.com/avatars/155149108183695360/19a5ee4114b47195fcecc6646f2380b1.png",
    accessableby: "Everyone",
    aliases: ["removebackground", "rbackground"]
}