const fs = require("fs");
const { utc } = require("moment");

module.exports.run = async (bot) => {
  fs.readdir("./events/", (err, files) => {
    if (err) return console.error;
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      const evt = require(`../events/${file}`);
      const evtName = file.split(".")[0];
      bot.events.set(evtName, evt);
      bot.on(evtName, evt.bind(null, bot));
    });
    console.log(
      `[${utc().format("HH:mm:ss")}] Successfully loaded ${
        bot.events.size
      } events`
    );
  });
};
