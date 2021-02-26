const { owners } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (!owners.includes(message.author.id)) {
    return;
  } else {
    try {
      await message.channel.send(
        `<a:loading:393852367751086090> ${bot.user.tag} is restarting...`
      );
      process.exit();
    } catch (e) {
      return message.channel.send(
        `Uh oh, an error has occurred while running the command. Error: **${err}**. Make sure to report this to ${botconfig.owners
          .map((o) => `**${bot.users.cache.get(o).tag}**`)
          .join(", or ")} asap.`
      );
    }
  }
};

module.exports.config = {
  name: "restart",
  description: "Restarts the bot",
  usage: "restart",
  category: "Developer",
  example: "restart",
  accessableby: "Developer",
  aliases: ["botrestart", "restartbot"],
};
