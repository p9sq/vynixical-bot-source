const hastebin = require("hastebin-gen");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const query = args[0];
    if (!query) return message.channel.send("<:maybe:793205689153093702> **Please include a discriminator**");

    const users = bot.users.cache.filter(user => user.discriminator === query).map(m => m.tag);
    if (!users.length) return message.channel.send(`<:deny:793205689488900136> **No users found with discriminator #${query}**`);

    hastebin(users.join("\n"))
        .then(haste => {
            message.channel.send(`**${users.length} Users found with discriminator #${query}**!\n${haste}`);
        })
        .catch((err) => {
            message.channel.send(`Uh oh, an error has ocurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners.map(o => `**${bot.users.cache.get(o).tag}**`).join(", or ")} asap.`)
        });
}

module.exports.config = {
    name: "discrim",
    description: "Searches for users with a certain discriminator",
    usage: "discrim <discriminator>",
    category: "Info",
    example: "discrim 0001",
    accessableby: "Everyone",
    aliases: ["discriminator"]
}