const { owners } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (!owners.includes(message.author.id)) {
    return;
  } else {
    try {
      await message.reply(
        `<a:loading:393852367751086090> ${bot.user.tag} is restarting...`
      );
      process.exit();
    } catch (e) {
      return message.reply(`**Error while restarting bot:** ${e}`);
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
