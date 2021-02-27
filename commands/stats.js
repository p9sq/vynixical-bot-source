const fetch = require("node-fetch");
const Discord = require("discord.js");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (message.guild.id !== "758641373074423808")
    return message.channel.send(
      "**<:deny:793205689488900136> This command can only be used in Infinity Bot List**"
    );
  const botMention = message.mentions.users.first();
  if (!botMention.bot) return message.channel.send("That user isn't a bot!");
  if (!botMention) return message.channel.send("Please mention a bot!");
  fetch(`https://api.infinitybots.xyz/bot/${botMention.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const stats = await res.json();
    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(`${stats.name} Stats`)
      .setDescription(
        `
            **Tags:** ${stats.tags},
            **Owner:** ${stats.owner},
            **Short Description:** ${stats.short},
            **Library:** ${stats.library},
            **Premium?:** ${stats.premium ? "Yes" : "No"},
            **Staff?:** ${stats.staff ? "Yes" : "No"},
            **NSFW?:** ${stats.nsfw ? "Yes" : "No"},
            **Certified?:** ${stats.certified ? "Yes" : "No"},
            **Servers:** ${stats.analytics.servers.toLocaleString()},
            **Shards:** ${stats.analytics.shards.toLocaleString()},
            **Votes:** ${stats.analytics.votes.toLocaleString()},
            **Invites:** ${stats.analytics.invites.toLocaleString()},
            **Website:** [Website](${stats.links.website}),
            **Donate:** [Donate](${stats.links.donate}),
            **Support Server:** [Support Server](${stats.links.support}),
            **GitHub:** [GitHub](${stats.links.github}),
            **Banner:** [Banner](${stats.links.banner})
            `
      );
    message.channel.send(embed);
  });
};

module.exports.config = {
  name: "stats",
  description: "Gets the stats on a bot from IBL",
  usage: "stats <bot>",
  category: "Info",
  example: "stats @Vynixical#0874",
  accessableby: "Everyone",
  aliases: ["iblstats"],
};
