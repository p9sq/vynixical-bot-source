const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const { utc } = require("moment");
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

commandHandler.run(bot);
eventHandler.run(bot);

bot.login(botconfig.token);
