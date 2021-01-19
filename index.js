const botconfig = require("./botconfig.json");
const mongoose = require("mongoose");
const Discord = require("discord.js");
const { utc } = require("moment");
const { scheduleGiveaways, loadCommands, loadEvents } = require("./utils");
const Giveaway = require("./models/giveaway");

const bot = new Discord.Client({disableMentions: "everyone"});
bot.setMaxListeners(0);
bot.utils = require("./utils");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = new Discord.Collection();
bot.snipes = new Discord.Collection();
bot.events = new Discord.Collection();
bot.suggestions = new Discord.Collection();

process.on("unhandledRejection", (error) => console.log(`[${utc().format("HH:mm:ss")}] ${error}`));
process.on("uncaughtException", (error) => console.log(`[${utc().format("HH:mm:ss")}] ${error}`));
process.on("uncaughtExceptionMonitor", (error) => console.log(`[${utc().format("HH:mm:ss")}] ${error}`));

bot.on("ready", async () => {
  console.log(`[${utc().format("HH:mm:ss")}] Logged in as ${bot.user.tag}`);
  loadCommands(bot);
  loadEvents(bot);
  const statuses = [
    `Connected to ${bot.guilds.cache.size.toLocaleString()} servers | ??help`,
    `Watching ${bot.channels.cache.size.toLocaleString()} channels | ??help`,
    `Listening to ${bot.users.cache.size.toLocaleString()} users | ??help`,
    `Counting ${bot.emojis.cache.size.toLocaleString()} emojis | ??help`,
    `Looking at ${bot.ws.totalShards} shard(s) | >help`
  ];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  bot.user.setPresence({activity: {name: status, type: "PLAYING"}, status: "idle"});
  setInterval(() => bot.user.setPresence({activity: {name: status, type: "PLAYING"}, status: "idle"}), 60000);
  setInterval(() => require("./ibl-poststats")(bot), 3e5);
  mongoose.connect("mongodb+srv://admin:pz1234567@snakeboy-uoihx.mongodb.net/SnakeBoy_events?retryWrites=true&w=majority", {useNewUrlParser: true,
  useUnifiedTopology: true}).then(console.log(`[${utc().format("HH:mm:ss")}] Successfully connected to MongoDB`));
  const current = new Date();
  const giveaways = await Giveaway.find({endsOn: {$gt: current}});
  await scheduleGiveaways(bot, giveaways);
});

bot.login(botconfig.token);