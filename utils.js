const Giveaway = require("./models/giveaway");
const schedule = require("node-schedule");
const botconfig = require("./botconfig.json");
const fs = require("fs");
const { utc } = require("moment");

async function saveGiveaway(response) {
    if(!response) throw new Error("Missing the response")
    const { title, prize, winners, duration, guildId, messageId, channelId, endsOn } = response;
    const giveaway = new Giveaway({
        guildId,
        messageId,
        channelId,
        title,
        prize,
        winners,
        duration,
        endsOn,
        createdOn: new Date()
    });
    return giveaway.save()
}

async function scheduleGiveaways(bot, giveaways) {
    if(!bot) throw new Error("Missing bot")
    if(!giveaways) throw new Error("Missing giveaways array")
    for (let i = 0; i < giveaways.length; i++) {
        const { channelId, messageId, endsOn, prize } = giveaways[i];
        schedule.scheduleJob(endsOn, async () => {
          const channel = bot.channels.cache.get(channelId);
          if(channel) {
              const message = await channel.messages.fetch(messageId);
              if(message) {
                  const { embeds, reactions } = message;
                  const reaction = reactions.cache.get("🎉");
                  if(reaction.count <= 1) return message.channel.send(`A winner could not be determined!\n${message.url}`)
                  const users = await reaction.users.fetch();
                  const entries = users.filter(user => !user.bot).array();
                  const winner = entries[0];
                  if(embeds.length === 1) {
                      const embed = embeds[0];
                      let winners = determineWinners(entries, giveaways[i].winners)
                      winners = winners.map(user => user.toString()).join(", ");
                      embed.setDescription(`~~${embed.description}~~`);
                      await message.edit("🎉 **GIVEAWAY ENDED** 🎉");
                      await message.channel.send(`Congratulations ${winners}! You won the **${prize}**!\n${message.url}`);
                  }
              }
          }
        })
    }
}

function determineWinners(users, max) {
    if(!users) throw new Error("Missing the winners")
    if(!max) throw new Error("Missing the max number of winners")
    if(users.length <= max) return users;
    const numbers = new Set();
    const winnersArray = [];
    let i = 0;
    while (i < max) {
       const random = Math.floor(Math.random() * users.length); 
       const selected = users[random];
       if(!numbers.has(random)) {
           winnersArray.push(selected);
           i++;
       }
    }
    return winnersArray;
}

function encode(char) {
    if(!char) throw new Error("Missing text")
    return char.split("").map(str => {
        const converted = str.charCodeAt(0).toString(2);
        return converted.padStart(8, "0");
    }).join(" ")
}

function decode(char) {
    if(!char) throw new Error("Missing binary code")
    return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
}

function capitalizeFirstLetter(string) {
    if(!string) throw new Error("Missing text")
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clean(text) {
    if(!text) throw new Error("Missing text")
    if (typeof text === "string") {
        text = text
            .replace(/`/g, `\`${String.fromCharCode(8203)}`)
            .replace(/@/g, `@${String.fromCharCode(8203)}`)
            .replace(new RegExp(botconfig.token, "gi"), "*".repeat(botconfig.token.length))
            .replace(new RegExp(botconfig.google, "gi"), "*".repeat(botconfig.google.length))
            .replace(new RegExp(botconfig.iblApiToken, "gi"), "*".repeat(botconfig.iblApiToken.length))
    }
    return text;
}

function trimArray(arr, maxLen = 10) {
    if(!arr) throw new Error("Missing array")
    if(!maxLen) throw new Error("Missing the max length")
    if(arr.length > maxLen) {
        const len = arr.length - maxLen;
        arr = arr.slice(0, maxLen);
        arr.push(`${len} more...`);
    }
    return arr;
}

function formatBytes(bytes) {
    if(!bytes) throw new Error("Missing the bytes")
    if(bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
}

function duration(ms) {
    if(!ms) throw new Error("Missing 'ms'")
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
    return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
}

function loadCommands(bot) {
    if(!bot) throw new Error("Missing the bot")
  fs.readdir("./commands/", (err, files) => {
  
      if(err) console.log(err)
  
      let jsfile = files.filter(f => f.split(".").pop() === "js")
      if(jsfile.length <= 0) {
          return console.log(`Couldn't Find Commands!`);
      }
  
      jsfile.forEach((f, i) => {
          let pull = require(`./commands/${f}`);
          bot.commands.set(pull.config.name, pull);
          bot.categories.set(pull.config.category, pull)
          pull.config.aliases.forEach(alias => {
              bot.aliases.set(alias, pull.config.name)
          });
      });
      console.log(`[${utc().format("HH:mm:ss")}] Successfully loaded ${bot.commands.size} commands`)
  });
}

function loadEvents(bot) {
    if(!bot) throw new Error("Missing the bot")
    fs.readdir('./events/', (err, files) => {
        if (err) return console.error;
        files.forEach(file => {
            if (!file.endsWith('.js')) return;
            const evt = require(`./events/${file}`);
            let evtName = file.split('.')[0];
            bot.events.set(evtName, evt);
            bot.on(evtName, evt.bind(null, bot));
        });
        console.log(`[${utc().format("HH:mm:ss")}] Successfully loaded ${bot.events.size} events`)
    });
}

function insertCommands(bot, embed) {
    if(!bot) throw new Error("Missing the bot")
    if(!embed) throw new Error("Missing the embed")
    bot.categories.map(cat => embed.addField(cat.config.category, bot.commands.filter(cmd => cmd.config.category === cat.config.category).map(cmd => `\`${cmd.config.name}\``).join(", ")))
}

module.exports = {
    saveGiveaway,
    scheduleGiveaways,
    encode,
    decode,
    capitalizeFirstLetter,
    clean,
    trimArray,
    formatBytes,
    duration,
    loadCommands,
    loadEvents,
    insertCommands
}