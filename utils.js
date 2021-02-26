const Giveaway = require("./models/giveaway");
const schedule = require("node-schedule");
const botconfig = require("./botconfig.json");
const { Client } = require("discord.js");

async function saveGiveaway(response) {
  if (!response) throw new Error("Missing the response");
  const {
    title,
    prize,
    winners,
    duration,
    guildId,
    messageId,
    channelId,
    endsOn,
  } = response;
  const giveaway = new Giveaway({
    guildId,
    messageId,
    channelId,
    title,
    prize,
    winners,
    duration,
    endsOn,
    createdOn: new Date(),
  });
  return giveaway.save();
}

async function scheduleGiveaways(bot, giveaways) {
  if (!bot) throw new Error("Missing bot");
  if (!giveaways) throw new Error("Missing giveaways array");
  if (!bot instanceof Client)
    throw new TypeError("Client parameter must be a discord client");
  for (let i = 0; i < giveaways.length; i++) {
    const { channelId, messageId, endsOn, prize } = giveaways[i];
    schedule.scheduleJob(endsOn, async () => {
      const channel = bot.channels.cache.get(channelId);
      if (channel) {
        const message = await channel.messages.fetch(messageId);
        if (message) {
          const { embeds, reactions } = message;
          const reaction = reactions.cache.get("🎉");
          if (reaction.count <= 1)
            return message.channel.send(
              `A winner could not be determined!\n${message.url}`
            );
          const users = await reaction.users.fetch();
          const entries = users.filter((user) => !user.bot).array();
          const winner = entries[0];
          if (embeds.length === 1) {
            const embed = embeds[0];
            let winners = determineWinners(entries, giveaways[i].winners);
            winners = winners.map((user) => user.toString()).join(", ");
            embed.setDescription(`~~${embed.description}~~`);
            await message.edit("🎉 **GIVEAWAY ENDED** 🎉");
            await message.channel.send(
              `Congratulations ${winners}! You won the **${prize}**!\n${message.url}`
            );
          }
        }
      }
    });
  }
}

function determineWinners(users, max) {
  if (!users) throw new Error("Missing the winners");
  if (!max) throw new Error("Missing the max number of winners");
  if (!max instanceof Number)
    throw new TypeError("Max winners must be a number");
  if (users.length <= max) return users;
  const numbers = new Set();
  const winnersArray = [];
  let i = 0;
  while (i < max) {
    const random = Math.floor(Math.random() * users.length);
    const selected = users[random];
    if (!numbers.has(random)) {
      winnersArray.push(selected);
      i++;
    }
  }
  return winnersArray;
}

function encode(char) {
  if (!char) throw new Error("Missing text");
  if (!char instanceof String) throw new TypeError("Char must be a string");
  return char
    .split("")
    .map((str) => {
      const converted = str.charCodeAt(0).toString(2);
      return converted.padStart(8, "0");
    })
    .join(" ");
}

function removeDuplicates(str) {
  return [...new Set(str)];
}

function decode(char) {
  if (!char) throw new Error("Missing binary code");
  if (!char instanceof Number) throw new TypeError("Char must be a number");
  return char
    .split(" ")
    .map((str) => String.fromCharCode(Number.parseInt(str, 2)))
    .join("");
}

function capitalizeFirstLetter(string) {
  if (!string) throw new Error("Missing text");
  if (!string instanceof String) throw new TypeError("String must be string");
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function clean(text) {
  if (!text) throw new Error("Missing text");
  if (!text instanceof String) throw new TypeError("Text must be a string");
  if (typeof text === "string") {
    text = text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`)
      .replace(
        new RegExp(botconfig.token, "gi"),
        "*".repeat(botconfig.token.length)
      )
      .replace(
        new RegExp(botconfig.google, "gi"),
        "*".repeat(botconfig.google.length)
      )
      .replace(
        new RegExp(botconfig.apiTokens.ibl, "gi"),
        "*".repeat(botconfig.apiTokens.ibl.length)
      )
      .replace(
        new RegExp(botconfig.apiTokens.dbots, "gi"),
        "*".repeat(botconfig.apiTokens.dbots.length)
      )
      .replace(
        new RegExp(botconfig.apiTokens.vultrex, "gi"),
        "*".repeat(botconfig.apiTokens.vultrex.length)
      )
      .replace(
        new RegExp(botconfig.apiTokens.topgg, "gi"),
        "*".repeat(botconfig.apiTokens.topgg.length)
      )
      .replace(
        new RegExp(botconfig.apiTokens.topgg, "gi"),
        "*".repeat(botconfig.apiTokens.topgg.length)
      )
      .replace(
        new RegExp(botconfig.apiTokens.fates, "gi"),
        "*".repeat(botconfig.apiTokens.fates.length)
      )
      .replace(
        new RegExp(botconfig.apiTokens.cyclone, "gi"),
        "*".repeat(botconfig.apiTokens.cyclone.length)
      )
      .replace(
        new RegExp(botconfig.apiTokens.matrix, "gi"),
        "*".repeat(botconfig.apiTokens.matrix.length)
      );
  }
  return text;
}

function trimArray(arr, maxLen = 10) {
  if (!arr) throw new Error("Missing array");
  if (!maxLen) throw new Error("Missing the max length");
  if (!arr instanceof Array) throw new TypeError("Array isn't a proper array");
  if (!maxLen instanceof Number)
    throw new TypeError("Max length must be a number");
  if (arr.length > maxLen) {
    const len = arr.length - maxLen;
    arr = arr.slice(0, maxLen);
    arr.push(`${len} more...`);
  }
  return arr;
}

function formatBytes(bytes) {
  if (!bytes) throw new Error("Missing the bytes");
  if (!bytes instanceof Number) throw new TypeError("Bytes must be a number");
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

function duration(ms) {
  if (!ms) throw new Error("Missing the milliseconds");
  if (!ms instanceof Number)
    throw new TypeError("Milliseconds must be a number");
  const sec = Math.floor((ms / 1000) % 60).toString();
  const min = Math.floor((ms / (1000 * 60)) % 60).toString();
  const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
  const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
  return `${days.padStart(1, "0")} days, ${hrs.padStart(
    2,
    "0"
  )} hours, ${min.padStart(2, "0")} minutes, ${sec.padStart(2, "0")} seconds`;
}

function halfString(string) {
  if (!string) throw new Error("Missing the string parameter");
  if (!string instanceof String) throw new TypeError("String must be a string");
  const stringlen = string.length;
  const halflen = stringlen / 2;
  const hidden = string.slice(halflen);
  const res = string.replace(hidden, "".repeat(hidden.length));

  return res;
}

function halfHide(string) {
  if (!string) throw new Error("Missing the string parameter");
  if (!string instanceof String) throw new TypeError("String must be a string");
  const stringlen = string.length;
  const halflen = stringlen / 2;
  const hidden = string.slice(halflen);
  const res = string.replace(hidden, "*".repeat(hidden.length));

  return res;
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
  halfString,
  halfHide,
  removeDuplicates,
};
