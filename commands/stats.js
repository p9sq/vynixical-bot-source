const Discord = require("discord.js");
const { color } = require("../botconfig.json");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
  if (message.guild.id !== "758641373074423808")
    return message.channel.send(
      "**<:deny:793205689488900136> This command can only be used in Infinity Bot List**"
    );
  const botMention = message.mentions.users.first();
  if (!botMention.bot) return message.channel.send("That user isn't a bot!");
  if (!botMention) return message.channel.send("Please mention a bot!");
  fetch(`https://api.infinitybots.xyz/bot/${botMention}/info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json)
    .then((data) => {
      const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${stats.name} Stats`)
        .setDescription(
          `
            **Tags:** ${data.tags},
            **Owner:** ${data.owner},
            **Short Description:** ${data.short},
            **Library:** ${data.library},
            **Premium?:** ${data.premium ? "Yes" : "No"},
            **Staff?:** ${data.staff ? "Yes" : "No"},
            **NSFW?:** ${data.nsfw ? "Yes" : "No"},
            **Certified?:** ${data.certified ? "Yes" : "No"},
            **Servers:** ${data.analytics.servers},
            **Shards:** ${data.analytics.shards},
            **Votes:** ${data.analytics.votes},
            **Invites:** ${data.analytics.invites},
            **Website:** [Website](${data.links.website}),
            **Donate:** [Donate](${data.links.donate}),
            **Support Server:** [Support Server](${data.links.support}),
            **GitHub:** [GitHub](${data.links.github}),
            **Banner:** [Banner](${data.links.banner})
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
