const fetch = require("node-superfetch");
const Discord = require("discord.js");
const { googleKeys, color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  const name = args.join(" ");
  if (!name)
    return message.reply("Unknown channel name!", {
      allowedMentions: { repliedUser: false },
    });

  const channel = await fetch
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${googleKeys[1]}&maxResults=1&type=channel`
    )
    .catch(() => message.channel.send("Unknown channel error."));

  if (!channel.body.items[0])
    return message.channel.send("No channel result. Try again.");

  const data = await fetch
    .get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${googleKeys[1]}`
    )
    .catch(() => message.channel.send("Unknown channel data error."));

  const embed = new Discord.MessageEmbed()
    .setColor(color)
    .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
    .setTimestamp(new Date())
    .addField("Channel Name:", channel.body.items[0].snippet.channelTitle, true)
    .addField(
      "Channel Description:",
      channel.body.items[0].snippet.description
        ? channel.body.items[0].snippet.description
        : "No channel description",
      true
    )
    .addField(
      "Subscribers Count:",
      parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(),
      true
    )
    .addField(
      "Total Views:",
      parseInt(data.body.items[0].statistics.viewCount).toLocaleString(),
      true
    )
    .addField(
      "Total Video(s):",
      parseInt(data.body.items[0].statistics.videoCount).toLocaleString(),
      true
    )
    .addField(
      "Date Created:",
      new Date(channel.body.items[0].snippet.publishedAt).toDateString(),
      true
    )
    .addField(
      "Link:",
      `[${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`,
      true
    );
  return message.channel.send(embed);
};

module.exports.config = {
  name: "ytstats",
  description: "Gets information about a youtube channel",
  usage: "ytstat <channel>",
  category: "Info",
  example: "ytstats",
  accessableby: "Everyone",
  aliases: ["youtubestats", "youtube", "yts", "ytstat"],
};
