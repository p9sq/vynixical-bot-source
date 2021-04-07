const { utc } = require("moment");
const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "commands");

module.exports.run = (bot) => {
  for (const cmd of readdirSync(filePath).filter((cmd) =>
    cmd.endsWith(".js")
  )) {
    const props = require(`${filePath}/${cmd}`);
    bot.commands.set(props.config.name, props);
    bot.categories.set(props.config.category, props);

    if (props.config.aliases)
      for (const alias of props.config.aliases) {
        bot.aliases.set(alias, props);
      }
  }

  console.log(
    `[${utc().format("HH:mm:ss")}] Successfully loaded ${
      bot.commands.size
    } commands`
  );
};
