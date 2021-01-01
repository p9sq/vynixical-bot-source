const Discord = require("discord.js");
const ud = require("urban-dictionary");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === false) return message.channel.send("NSFW only command, please use this command in nsfw marked channels!")
  if(!args.join(" ")) return;
  let definition = args.join(" ")
  
  ud.term(definition,  (error, entries, tags, sounds) => {
      if (error) {
        const { stripIndents } = require("common-tags");
        const botconfig = require("../botconfig.json");
        message.reply(stripIndents`An error occurred while running the command: \`${err}\`
        You shouldn't ever receive an error like this.
        Please contact ${bot.users.cache.get(botconfig.owners[0]).tag}`);
      } else {
        let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setURL(`https://www.urbandictionary.com/${definition}`)
        .setTitle(`Definition of ${definition}`)
        .setThumbnail('https://wjlta.files.wordpress.com/2013/07/ud-logo.jpg')
        .setDescription(entries[0].definition)
        .addField("Example:", entries[0].example)
        .addField(":thumbsup:", entries[0].thumbs_up, true)
        .addField(":thumbsdown:", entries[0].thumbs_down, true)
        .addField("Author:", entries[0].author)
        .setFooter(`${bot.user.username} | Requested by: ${message.author.tag}`, bot.user.displayAvatarURL())
        .setTimestamp()
        message.channel.send(embed)
      } 
  }) 
}

module.exports.config = {
    name: "urban",
    description: "Searches the urban dictionary",
    usage: "urban [word]",
    category: "Info",
    example: "urban Discord",
    accessableby: "Everyone",
    aliases: []
}