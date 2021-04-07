const botconfig = require("../botconfig.json");
const mongoose = require("mongoose");
const { utc } = require("moment");
const { scheduleGiveaways } = require("../utils");
const Giveaway = require("../models/giveaway");

module.exports = async (bot) => {
  console.log(`[${utc().format("HH:mm:ss")}] Logged in as ${bot.user.tag}`);
  const statuses = [
    `Connected to ${bot.guilds.cache.size.toLocaleString()} servers | ${
      botconfig.defaultPrefix
    }help`,
    `Watching ${bot.channels.cache.size.toLocaleString()} channels | ${
      botconfig.defaultPrefix
    }help`,
    `Listening to ${bot.users.cache.size.toLocaleString()} users | ${
      botconfig.defaultPrefix
    }help`,
    `Counting ${bot.emojis.cache.size.toLocaleString()} emojis | ${
      botconfig.defaultPrefix
    }help`,
    `Total shards: ${bot.shard.count} | ${botconfig.defaultPrefix}help`,
    `Visit https://vynixical.com/ | ${botconfig.defaultPrefix}help`,
  ];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  bot.user.setPresence({
    activity: { name: status, type: "PLAYING" },
    status: "dnd",
  });
  setInterval(
    () =>
      bot.user.setPresence({
        activity: { name: status, type: "PLAYING" },
        status: "dnd",
      }),
    60000
  );
  mongoose
    .connect(
      "mongodb+srv://vynixical:90iPBwp30oKNRh6T@data.b2enz.mongodb.net/collections?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(
      console.log(
        `[${utc().format("HH:mm:ss")}] Successfully connected to MongoDB`
      )
    )
    .catch((err) =>
      console.log(`[${utc().format("HH:mm:ss")}] MongoDB Error: ${err}`)
    );
  const current = new Date();
  const giveaways = await Giveaway.find({ endsOn: { $gt: current } });
  await scheduleGiveaways(bot, giveaways);
};
