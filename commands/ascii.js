const figlet = require("figlet");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(!args.join(" ")) return message.channel.send("Please provide some text!")
    msg = args.join(" ")

    figlet.text(msg, function(err, data) {
        if(err) {
            const embed = new Discord.MessageEmbed()
                .setColor("#E31C08")
                .setTitle("Error! This wasn't supposed to happen")
                .setDescription(`Please report this to ${botconfig.owners.map(o => bot.users.cache.get(o)).join(", or ")}`)
                .addField("Error:", "```js\n" + err + "```")
                .setTimestamp()
            return message.channel.send(embed);
        }
        if(data.length > 2000) return message.reply("Please provide text shorter that 2000 characters.");
        message.channel.send(`\`\`\`${data}\`\`\``);
    })
}

module.exports.config = {
    name: "ascii",
    description: "Converts text to ascii",
    usage: "ascii <text>",
    category: "Fun",
    example: "asii Hello There",
    accessableby: "Everyone",
    aliases: ["asciitext", "textascii"]
}