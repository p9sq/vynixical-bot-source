const botconfig = require("./botconfig.json");
const mongoose = require("mongoose");
const Discord = require("discord.js");
const { utc } = require("moment");
const { scheduleGiveaways } = require("./utils");
const Giveaway = require("./models/giveaway");
const commandHandler = require("./structures/command");
const eventHandler = require("./structures/event");

const bot = new Discord.Client({
  disableMentions: "everyone",
});
bot.setMaxListeners(0);
bot.utils = require("./utils");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = new Discord.Collection();
bot.snipes = new Discord.Collection();
bot.events = new Discord.Collection();
bot.suggestions = new Discord.Collection();

process.on("unhandledRejection", (error) =>
  console.log(`[${utc().format("HH:mm:ss")}] ${error}`)
);
process.on("uncaughtException", (error) =>
  console.log(`[${utc().format("HH:mm:ss")}] ${error}`)
);
process.on("uncaughtExceptionMonitor", (error) =>
  console.log(`[${utc().format("HH:mm:ss")}] ${error}`)
);

bot.on("ready", async () => {
  console.log(`[${utc().format("HH:mm:ss")}] Logged in as ${bot.user.tag}`);
  commandHandler.run(bot);
  eventHandler.run(bot);
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
      "mongodb+srv://vynixical-user:p7su37UJ08jZzBq6@vynixical-db.0f3pi.mongodb.net/Data",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(
      console.log(
        `[${utc().format("HH:mm:ss")}] Successfully connected to MongoDB`
      )
    )
    .catch(err => console.log(`[${utc().format("HH:mm:ss")}] Mongoose Connection Error: ${err}`))
  const current = new Date();
  const giveaways = await Giveaway.find({ endsOn: { $gt: current } });
  await scheduleGiveaways(bot, giveaways);
});

bot.login(botconfig.token);
