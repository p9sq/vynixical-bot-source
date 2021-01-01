const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const role = message.mentions.roles.last() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(role => role.name === args.join(" "))
    let txt = "";
    if(role.hoist) {
        txt = "Yes"
    } else if(!role.hoist) {
        txt = "No"
    }
    let text = "";
    if(role.managed) {
        text = "Yes"
    } else if(!role.managed) {
        text = "No"
    }
    let Text = "";
    if(role.deleted) {
        Text = "Yes"
    } else if(!role.deleted) {
        Text = "No"
    }
    let TEXT = "";
    if(role.mentionable) {
        TEXT = "Yes"
    } else if(!role.mentionable) {
        TEXT = "No"
    }
    if(!role) return message.channel.send("Please mention a role, or specify a role id, or specify a role name!")
    let embed = new Discord.MessageEmbed()
    .setTitle(`${role.name} info`)
    .setThumbnail(message.guild.iconURL({format: "png", dyamic: true, size: 2048}))
    .setColor(role.hexColor)
    .addField("Name:", role.name, true)
    .addField("ID:", role.id, true)
    .addField("Hoist:", txt, true)
    .addField("Color:", role.color, true)
    .addField("Hex Color:", role.hexColor, true)
    .addField("Raw position:", role.rawPosition, true)
    .addField("Permissions:", role.permissions.toArray().map(str => str.replace(/_/g, " ").toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())).join(", "), true)
    .addField("Managed:", text, true)
    .addField("Mentionable:", TEXT, true)
    .addField("Deleted:", Text, true)
    embed.setTimestamp()
    message.channel.send(embed);
}

module.exports.config = {
    name: "roleinfo",
    description: "Shows the role info by mention, id, or name",
    usage: "roleinfo <role-id | role-name | role-mention>",
    category: "Info",
    example: "roleinfo Admin",
    accessableby: "Everyone",
    aliases: ["role"]
}