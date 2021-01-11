const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
if(!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("<:maybe:793205689153093702> **I am missing the Manage Guild permission**")
if(!message.member.hasPermission("MANAGE_GUILD")) {
    let invalidEmbed = new Discord.MessageEmbed()
    .setTitle("Invalid Permissions!")
    .addField("Permissions Required:", "Manage Guild")
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
    message.channel.send(invalidEmbed);
} else {
    const userID = args[0]
    const messageID = args[1];
    const content = args.slice(2).join(" ");
    const suggestion = message.guild.channels.cache.get("749864488311980052").messages.cache.get(messageID);
    if(isNaN(userID)) return message.channel.send("<:maybe:793205689153093702> **UserID must be a number**")
    if(isNaN(messageID)) return message.channel.send("<:maybe:793205689153093702> **MessageID must be a number**")
    if(!bot.suggestions.has(userID, message.guild.id, messageID)) return message.channel.send("<:maybe:793205689153093702> **That user hasn't suggested anything**")
    if(!messageID) return message.channel.send("<:deny:793205689488900136> **Please specify a suggestion ID to edit**")
    if(!content) return message.channel.send("<:deny:793205689488900136> **Please specify the new suggestion**")
    if(!suggestion) return message.channel.send("<:deny:793205689488900136> **That suggestion does not exist**")
    if(suggestion) {
        if(content) {
            const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .addField(`Suggestion by ${message.author.tag}`, content)
            suggestion.edit(embed);
            message.channel.send(`<:allow:793205689753010217> **The suggestion was successfully edited. New suggestion: ${content}**`)
        }
    }
}
}

module.exports.config = {
    name: "editsuggestion",
    description: "Edits the suggestion",
    usage: "editsuggestion <userID> <messageID> <content>",
    category: "Moderation",
    example: "editsuggestion 490064230717063195 798323583956811777 This is better than that",
    accessableby: "Admins",
    aliases: ["es", "editsug"]
}