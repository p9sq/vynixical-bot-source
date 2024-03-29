const { owners } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (!owners.includes(message.author.id)) {
    return;
  } else {
    if (!args[0])
      return message.reply(
        "<:maybe:793205689153093702> **You must input a command name**"
      );

    const command = args[0].toLowerCase();

    try {
      delete require.cache[require.resolve(`./${command}.js`)];
      bot.commands.delete(command);

      const pull = require(`./${command}.js`);
      bot.commands.set(command, pull);

      return message.reply(
        `<:allow:793205689753010217> **Successfully reloaded ${args[0].toLowerCase()} command**`
      );
    } catch (error) {
      return message.reply(
        `<:deny:793205689488900136> **Error while reloading ${args[0].toLowerCase()} command**: \`${error}\``
      );
    }
  }
};

module.exports.config = {
  name: "reload",
  description: "Reloads a command",
  usage: "reload <command>",
  category: "Developer",
  example: "reload eval",
  accessableby: "Developer",
  aliases: ["reloadcmd", "rc", "reloadcommand"],
};
