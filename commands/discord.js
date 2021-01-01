const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    if(!args.join(" ")) return message.channel.send("Please specify a search query!");
    const query = args[0];
    fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`).then(res => res.json()).then(json => message.channel.send({ embed: json }))
}

module.exports.config = {
    name: "discordjs",
    description: "Search the discord.js docs",
    usage: "discordjs [query]",
    category: "Info",
    example: "discordjs ClientUser",
    accessableby: "Everyone",
    aliases: ["djs-docs"]
}