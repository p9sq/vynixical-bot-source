const fs = require("fs");
const { utc } = require("moment");

module.exports.run = async (bot) => {
  fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    const jsfile = files.filter((f) => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
      return console.log("Couldn't Find Commands");
    }

    jsfile.forEach((f, i) => {
      const pull = require(`../commands/${f}`);
      bot.commands.set(pull.config.name, pull);
      bot.categories.set(pull.config.category, pull);
      pull.config.aliases.forEach((alias) => {
        bot.aliases.set(alias, pull.config.name);
      });
    });
    console.log(
      `[${utc().format("HH:mm:ss")}] Successfully loaded ${
        bot.commands.size
      } commands`
    );
  });
};
