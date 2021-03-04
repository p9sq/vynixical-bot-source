const botconfig = require("../botconfig.json");
require("../inlineReply");

module.exports.run = async (bot, message, args) => {
  if (!botconfig.owners.includes(message.author.id)) {
    return;
  } else {
    if (!args.length)
      return message.channel.send("Please input some text to reply with.");
    if (args.length) {
      message.inlineReply(args.join(" "));
    }
  }
};

module.exports.config = {
  name: "test",
  description: "Inline reply test",
  usage: "test",
  category: "Developer",
  example: "test <message>",
  accessableby: "Developer",
  aliases: ["inlinereply"],
};
