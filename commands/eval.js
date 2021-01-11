const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const { post } = require("node-superfetch");
const { inspect } = require("util");

module.exports.run = async (bot, message, args) => {
  if(!botconfig.owners.includes(message.author.id)) {
  message.react("710703782887161898")
  let embed = new Discord.MessageEmbed()
  .setTitle("❌ Access Denied!")
  .setDescription("You aren't the owner of this bot!")
  .setColor("RED")
  .setFooter(bot.user.username, bot.user.displayAvatarURL({format: "png"}))
  .setTimestamp()
  message.channel.send(embed)
  } else {
    if(!args.length) return message.channel.send("Please input the code.");
    const msg = message;
    const author = message.author;
    const member = message.member;
    const guild = message.guild;
    const channel = message.channel;

    let code = args.join(" ");
    code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    let evaled;
    try {
        const start = process.hrtime();
        evaled = eval(code);
        const stop = process.hrtime(start);
        const res = bot.utils.clean(inspect(evaled, {depth: 0}));
        if (res.length < 2000) {
            await msg.reply(`*Executed in ${stop[0] > 0 ? `${stop[0]}s ` : ""}${stop[1] / 1e6}ms*\n\`\`\`js\n${res}\n\`\`\``);
        } else {
            const {body} = await post("https://hastebin.com/documents").send(res)
            await msg.reply(`The output was too big. I have posted it https://hastebin.com/${body.key}.js`);
        }
    } catch (err) {
        return message.reply(`Error while evaluating: \`${bot.utils.clean(err)}\``);
    }
  }
}

module.exports.config = {
    name: "eval",
    description: "Evaluates JavaScript code",
    usage: "eval <code>",
    category: "Developer",
    example: "eval message.channel.send(\"Hello World\")",
    accessableby: "Developer",
    aliases: ["e", "evaluate", "ev", "run"]
}