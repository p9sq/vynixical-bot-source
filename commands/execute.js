const process = require("child_process");
const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!botconfig.owners.includes(message.author.id)) {
  message.react("710703782887161898")
  const embed = new Discord.MessageEmbed()
    .setTitle("❌ Access Denied!")
    .setDescription("You aren't the owner of this bot!")
    .setColor("RED")
    .setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
    .setTimestamp()
  message.channel.send(embed)
  } else {
    const msg = await message.channel.send("Please wait...")
        process.exec(args.join(" "), (error, stdout) => {
            const response = (error || stdout);
            msg.delete();
            message.channel.send(response, {code: "asciidoc", split: "\n"}).catch(err => message.channel.send(err));
        });

            return;
  }
}

module.exports.config = {
    name: "exec",
    description: "Executes terminal commands",
    usage: "exec <command>",
    category: "Developer",
    example: "exec node index.js",
    accessableby: "Developer",
    aliases: ["execute"]
}