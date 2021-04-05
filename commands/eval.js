const botconfig = require("../botconfig.json");
const { inspect } = require("util");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!botconfig.owners.includes(message.author.id)) {
    return;
  } else {
    if (!args.length) return message.channel.send("Please input the code.");
    const msg = message;
    const author = message.author;
    const member = message.member;
    const guild = message.guild;
    const channel = message.channel;
    const me = message.guild.me;

    let code = args.join(" ");
    code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    let evaled;
    try {
      const start = process.hrtime();
      evaled = eval(code);
      const stop = process.hrtime(start);
      const res = bot.utils.clean(inspect(evaled, { depth: 0 }));
      if (res.length < 2000) {
        await msg.reply(
          `*Executed in ${stop[0] > 0 ? `${stop[0]}s ` : ""}${
            stop[1] / 1e6
          }ms*\n\`\`\`js\n${res}\n\`\`\``
        );
      } else {
        const output = new Discord.MessageAttachment(Buffer.from(res), "output.js");
        await message.reply(output);
      }
    } catch (err) {
      return message.reply(
        `Error while evaluating: \`${bot.utils.clean(err)}\``
      );
    }
  }
};

module.exports.config = {
  name: "eval",
  description: "Evaluates JavaScript code",
  usage: "eval <code>",
  category: "Developer",
  example: 'eval message.channel.send("Hello World")',
  accessableby: "Developer",
  aliases: ["e", "evaluate", "ev", "run"],
};
