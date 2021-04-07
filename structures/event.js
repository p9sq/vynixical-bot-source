const { utc } = require("moment");
const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "events");

module.exports.run = (bot) => {
  const eventFiles = readdirSync(filePath);
  for (const eventFile of eventFiles) {
    const event = require(`${filePath}/${eventFile}`);
    const eventName = eventFile.split(".").shift();
    bot.events.set(eventName, event);
    bot.on(eventName, event.bind(null, bot));
  }

  console.log(
    `[${utc().format("HH:mm:ss")}] Successfully loaded ${
      bot.commands.size
    } commands`
  );
};
