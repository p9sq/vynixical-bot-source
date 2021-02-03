const request = require("request");
const guildprefix = require("../models/prefix");

module.exports.run = async (bot, message, args) => {
  const image = message.attachments.first();

  guildprefix.findOne({guildID: message.guild.id}, (err, prefix) => {
    if(!image) return message.channel.send(`Please make sure that you are uploading an image to discord while using the **${prefix.prefix}removebg** command.`);

    request.post({
      url: "https://api.remove.bg/v1.0/removebg",
      formData: {
        image_url: image.proxyURL,
        size: "auto",
      },
      headers: {
        "X-Api-Key": "BBy8wMri5wkXP5F9xLfu9BJf"
      },
      encoding: null
    }, function(error, response, body) {
      message.channel.send("Processing...");
      if(error) return message.channel.send(`Request failed: \`${error}\``);
      if(response.statusCode != 200) return message.channel.send(`Error: \`${response.statusCode, body.toString("utf8")}\``);
      message.reply("Done! The background has been successfully removed!", new Discord.MessageAttachment(body, "no-bg.png"));
    });
});
}

module.exports.config = {
    name: "removebg",
    description: "Removes the background of an image",
    usage: "removebg <attachment>",
    category: "Image",
    example: "removebg [attachment-here-(make-sure-it's-not-a-url]",
    accessableby: "Everyone",
    aliases: ["removebackground", "rbackground"]
}