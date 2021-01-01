const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(message.guild.id !== "758641373074423808") return message.channel.send("This command can only be used in **Infinity Bot List**! <:infinitybotlistblue:772507094103621683>")
    if(!args[0]) return message.channel.send("Please specify a user id!")
    if(isNaN(args[0])) return message.channel.send("That is not a valid user id!")
    fetch(`https://infinitybotlist.com/api/users/${args[0]}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async res => {
        let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${res.username} Stats`)
        .setDescription(`
        **Developer:** ${res.developer ? "Yes" : "No"},
        **Staff:** ${res.staff ? "Yes" : "No"},
        **Certified:** ${res.certified_dev ? "Yes" : "No"},
        **About:** ${res.about}
        `)
        message.channel.send(embed)
    })
}

module.exports.config = {
    name: "user",
    description: "Gets the stats on a user from IBL",
    usage: "stats <user-id>",
    category: "Info",
    example: "user 490064230717063195",
    accessableby: "Everyone",
    aliases: ["ibluser"]
}