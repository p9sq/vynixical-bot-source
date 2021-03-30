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
    `Visit https://vynixical.com/ | ${botconfig.defaultPrefix}help`
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
      "mongodb+srv://db-user:db-password@vynixical-db.0f3pi.mongodb.net/Data?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(
      console.log(
        `[${utc().format("HH:mm:ss")}] Successfully connected to MongoDB`
      )
    );
  const current = new Date();
  const giveaways = await Giveaway.find({ endsOn: { $gt: current } });
  await scheduleGiveaways(bot, giveaways);

  console.log(bot.api.applications(bot.user.id).commands);

  bot.api.applications(bot.user.id).commands.post({
    data: {
      name: "whendie",
      description: "Tells the user when they are about to die",
      options: [
        {
          name: "member",
          description: "The member you are mentioning to see when they die",
          type: 6,
          required: true
        }
      ]
    }
  });

  bot.ws.on("INTERACTION_CREATE", async (interaction) => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    if(command === "whendie") {
      const member = args.find(arg => args.name.toLowerCase() === "member").value;
      const number = Math.floor(Math.random() * 99) * 1000; 
      const embed = new Discord.MessageEmbed()
        .setDescription(`${member.user.tag} is going to die in ${require("ms")(number, { long: true })}`)
        .setColor("RANDOM")
        .setFooter(`Requested by ${interaction.member.user.tag}`);

      bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: await createAPIMessage(interaction, embed)
        }
      });
    }
  });
});

async function createAPIMessage(interaction, content) {
  const apiMessage = await Discord.APIMessage.create(bot.channels.resolve(interaction.channel_id), content)
    .resolveData()
    .resolveFiles();

  return apiMessage;
}

bot.login(botconfig.token);
