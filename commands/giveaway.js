const Discord = require("discord.js");
const { color } = require("../botconfig.json");
const ms = require("ms");
const moment = require("moment");
const { saveGiveaway, scheduleGiveaways } = require("../utils");

const prompts = [
    "Give this giveaway a title!",
    "What are you giving away?",
    "How long do you want this giveaway to last?",
    "How many winners?"
];

module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("MANAGE_GUILD")) {
    const invalidEmbed = new Discord.MessageEmbed()
        .setTitle("Invalid Permissions!")
        .addField("Permissions Required:", "Manage Guild")
        .setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
    message.channel.send(invalidEmbed)
} else {
    if(!args[0]) return message.channel.send("Please specify a channel name!")
    const channel = message.guild.channels.cache.find(ch => ch.name === args[0])
    if(channel) {
        try {
            const response = await getResponses(message);
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .addField("Title:", response.title)
                .addField("Prize:", response.prize)
                .addField("Winners:", response.winners)
                .addField("Duration:", response.duration)
            const msg = await message.channel.send("**CONFIRM**", embed);
            await msg.react("✅");
            await msg.react("❌");

            const filter = (reaction, user) => ["✅", "❌"].includes(reaction.emoji.name) && !user.bot && user.id === message.author.id;
            const reactions = await msg.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] });
            const choice = reactions.get("✅") || reactions.get("❌");
            if(choice.emoji.name === "✅") {
                response.endsOn = new Date(Date.now() + ms(response.duration));
                const giveawayEmbed = new Discord.MessageEmbed()
                    .setTitle(response.title)
                    .setColor(color)
                    .setDescription(`
                    **Hosted by:** ${message.author}
                    **Prize:** ${response.prize}
                    **Winners:** ${response.winners}
                    **Ends At:** ${moment(response.endsOn).format("LT")}, ${moment(response.endsOn).format("LL")}
                    **React with 🎉 to enter**
                `)
                const giveawayMsg = await channel.send("🎉 **GIVEAWAY** 🎉", giveawayEmbed);
                await giveawayMsg.react("🎉")
                response.messageId = giveawayMsg.id;
                response.guildId = giveawayMsg.guild.id;
                response.channelId = channel.id;
                await saveGiveaway(response);
                await scheduleGiveaways(bot, [response]);
            } else if(choice.emoji.name === "❌") {
                message.channel.send("Giveaway Cancelled!");
            }
        } catch(err) {
            return message.channel.send("Error! You took to long to react, you can no longer confirm or deny the giveaway!")
        }
    } else {
        message.channel.send("That channel does not exist!")
    }
}
}

module.exports.config = {
    name: "create",
    description: "Creates a giveaway",
    usage: "create <channel-name>",
    category: "Moderation",
    example: "create giveaways",
    accessableby: "Admins",
    aliases: []
}

async function getResponses(message) {
    const validTime = /^\d+(s|m|h|s)$/;
    const validNumber = /\d+/;
    const responses = { }

    for(let i =0; i < prompts.length; i++) {
        await message.channel.send(prompts[i]);
        const response = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1 });
        const { content } = response.first();
        if(i === 0) 
            responses.title = content;
        else if(i === 1)
            responses.prize = content;
        else if (i === 2) {
            if(validTime.test(content))
            responses.duration = content;
        else 
            throw new Error("Invalid time format");
        }
        else if (i === 3) {
            if(validNumber.test(content))
                responses.winners = content;
            else throw new Error("Invalid entry for winners")
        }
    }
    return responses;
}