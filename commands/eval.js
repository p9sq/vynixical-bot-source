const botconfig = require("../botconfig.json");
const Discord = require("discord.js");
const { Type } = require("@extreme_hero/deeptype");
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
    let code = args.join(" ");
    code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    let evaled;
    try {
        const start = process.hrtime();
        evaled = eval(code);
        if (evaled instanceof Promise) {
            evaled = await evaled;
        }
        const stop = process.hrtime(start);
        const response = [
            `**Output:** \`\`\`js\n${bot.utils.clean(inspect(evaled, {depth: 0}))}\n\`\`\``,
            `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``,
            `**Time Taken:** \`\`\`\n${(((stop[0] * 1e9) + stop[1])) / 1e6}ms\n\`\`\``
        ]
        const res = response.join('\n');
        if (res.length < 2000) {
            await msg.channel.send(res);
        } else {
            const output = new Discord.MessageAttachment(Buffer.from(res), "output.txt");
            await msg.channel.send(output);
        }
    } catch (err) {
        return message.channel.send(`Error: \`\`\`xl\n${bot.utils.clean(err)}\n\`\`\``);
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

// const { VultrexHaste } = require("vultrex.haste");
// const haste = new VultrexHaste({ url: "https://hasteb.in" });
// const { inspect } = require("util");
// const { stripIndents } = require("common-tags");

  //   try {
  //     const start = process.hrtime();
  //     let output = eval(args.join(" "));
  //     const difference = process.hrtime(start);
  //     if (typeof output !== "string") output = inspect(output, { depth: 2 });

  //     return message.channel.send(stripIndents`
  //         *Executed in ${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms*
  //         \`\`\`js
  //         ${output.length > 1950 ? await haste.post(output) : output}
  //         \`\`\`
  //     `);
  // } catch(err) {
  //     return message.channel.send(`Error while evaluating: \`${err}\``);
  // }

  // const { post } = require("node-superfetch");

  // const msg = message;

  //   try {
  //     let code = args.join(" ");
  //     code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  //     if (!code) return msg.channel.send("Please input the code.");
  //     let evaled;

  //     evaled = eval(code);

  //     if(typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});

  //     const start = process.hrtime();
  //     const difference = process.hrtime(start);
  //     let output = clean(evaled)
  //     if (output.length > 1024) {
  //       const {body} = await post("https://hastebin.com/documents").send(output);
  //       msg.channel.send(`*Executed in ${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms*\`\`\`js\nhttps://hastebin.com/${body.key}.js\`\`\``)
  //     } else {
  //       msg.channel.send(`*Executed in ${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms*\`\`\`js\n${output}\`\`\``)
  //     }

  //   } catch (error) {
  //     let err = clean(error);
  //     if (err.length > 1024) {
  //       const {body} = await post("https://hastebin.com/documents").send(err);
  //       msg.channel.send(`Error while evaluating: \`https://hastebin.com/${body.key}.js\``)
  //     } else {
  //       msg.channel.send(`Error while evaluating: \`${err}\``)
  //     }
  //   }

  // function clean(string) {
  //   if(typeof string === "string") {
  //     return string.replace(/`/g, "`" + String.fromCharCode(8203))
  //     .replace(/@/g, "@" + String.fromCharCode(8203))
  //     .replace(new RegExp(botconfig.token, "gi"), "*".repeat(botconfig.token.length))
  //     .replace(new RegExp(botconfig.google, "gi"), "*".repeat(botconfig.google.length))
  //   } else {
  //     return string;
  //   }
  // }