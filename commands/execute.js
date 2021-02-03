const process = require("child_process");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if(!botconfig.owners.includes(message.author.id)) {
  return
  } else {
    const msg = await message.channel.send("Please wait...")
        process.exec(args.join(" "), (error, stdout) => {
            const response = (error || stdout);
            msg.delete();
            message.channel.send(response, {code: "asciidoc", split: "\n"}).catch(err => message.channel.send(err));
        });

            return;
  }
}

module.exports.config = {
    name: "exec",
    description: "Executes terminal commands",
    usage: "exec <command>",
    category: "Developer",
    example: "exec node index.js",
    accessableby: "Developer",
    aliases: ["execute"]
}