const Discord = require("discord.js");
const { color, owners } = require("../botconfig.json");
const accept = "761037152532299797";
const reject = "760961307221426246";
const opened = new Map();

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        let invalidEmbed = new Discord.MessageEmbed()
        .setTitle("Invalid Permissions!")
        .addField("Permissions Required:", "Administrator")
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());
        message.channel.send(invalidEmbed);
      } else {
        let author = bot.users.cache.get(message.author.id)
        let user = message.mentions.users.last();
        if(!user) return message.channel.send("<:maybe:793205689153093702> **Please mention a user**")
            let msg = args.slice(1).join(" ")
            if(!msg) return message.channel.send("<:maybe:793205689153093702> **Please provide a message to send**")
            message.channel.send(`<:allow:793205689753010217> **Successfully sent ${user.tag} your message`)
            let sentEmbed = new Discord.MessageEmbed()
            .setTitle("📥 You got mail")
            .setColor(color)
            .setDescription("Do you want to review it?")
            .setTimestamp();
            const sent = await user.send(sentEmbed).catch((err) => {
                message.channel.send(`Uh oh, an error has ocurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners.map(o => `**${bot.users.cache.get(o).tag}**`).join(", or ")} asap.`)
            })
            opened.set(user.id)
            await sent.react(accept)
            await sent.react(reject)
            const reactionFilter = (reaction, user) => [accept, reject].includes(reaction.emoji.id) && !user.bot;
            const reactions = await sent.awaitReactions(reactionFilter, {max: 1, time: 60000});
            const choice = reactions.get(accept) || reactions.get(reject);
            if(choice.emoji.id === accept) {
                if(opened.has(user.id)) {
                    let acceptEmbed = new Discord.MessageEmbed()
                    .setAuthor(`Message from: ${author.tag}`, author.displayAvatarURL({size: 2048, format: "png", dynamic: true}))
                    .setDescription(msg)
                    .setColor(color)
                    .setTimestamp()
                    await sent.edit(acceptEmbed)
                }
            } else if(choice.emoji.id === reject) {
                opened.delete(user.id)
                if(!opened.has(user.id)) {
                    let rejectEmbed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setAuthor(author.tag, author.displayAvatarURL({size: 2048, format: "png", dynamic: true}))
                    .setDescription("You have chosen to close the message. You can no longer view this message.")
                    .setTimestamp()
                    await sent.edit(rejectEmbed)
                }
            }
    }
}

module.exports.config = {
    name: "dm",
    description: "Sends the user a message",
    usage: "dm <user> <message>",
    category: "Moderation",
    example: "dm @Wumpus#0001 Hi, Do you like discord nitro?",
    accessableby: "Admins",
    aliases: ["directmessage", "directmsg", "send"]
}