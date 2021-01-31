const Discord = require("discord.js");
const guildprefix = require("../models/prefix");
const { color, owners } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let categories;
    if(!args[0]) {
        const embed = new Discord.MessageEmbed()
        guildprefix.findOne({guildID: message.guild.id}, (err, data) => {
            embed.setTitle(`${bot.user.username} Help Menu`)
            embed.setColor(color)
            embed.setDescription([
				`These are the available commands for ${message.guild.name}`,
				`The prefix for this server is \`${data.prefix ? data.prefix : defaultPrefix}\``,
                `Command Parameters: \`<>\` is strict & \`[]\` is optional`,
                `Don't actually include the command parameters when using any command`
			]);
	        if(!owners.includes(message.author.id)) {
		        categories = bot.utils.removeDuplicates(bot.commands.filter(cmd => cmd.config.category !== "Developer").map(cmd => cmd.config.category));
	        } else {
		        categories = bot.utils.removeDuplicates(bot.commands.map(cmd => cmd.config.category));
	        }

	        for (const category of categories) {
		        embed.addField(category, bot.commands.filter(cmd => cmd.config.category === category).map(cmd => `\`${cmd.config.name}\``).join(" "));
            }
            embed.addField("Links", `[Invite](https://discord.com/api/oauth2/authorize?client_id=725582436477698118&permissions=8&scope=bot) | [Support](https://discord.gg/sr2JWV6) | [Website](http://www.vynixical.com/) - Thanks to ${bot.users.cache.get("767928981399273509").tag} for the website`)
            embed.setFooter(`For more help, do ${data.prefix ? data.prefix : defaultPrefix}help [command]`)
            if(!message.guild.me.hasPermission("SEND_MESSAGES")) {
                message.author.send(embed)
            } else {
                message.channel.send(embed)
            }
        })
    } else {
        if(args[0]) {
            let command = args[0];
            if(bot.commands.has(command)) {
                command = bot.commands.get(command);
                const embed = new Discord.MessageEmbed()
                embed.setAuthor(`${bot.utils.capitalizeFirstLetter(command.config.name)} Command`, message.guild.iconURL({dynamic: true, size: 2048, format: "png"}))
                embed.setDescription(`
                **Description:** \`${command.config.description || "No description"}\`
                **Usage:** \`${command.config.usage || "No usage"}\`
                **Category:** \`${command.config.category || "No Category"}\`
                **Example:** \`${command.config.example || "No Example"}\`
                **Accessable by:** \`${command.config.accessableby || "Everyone"}\`
                **Aliases:** ${command.config.aliases.map(alias => `\`${alias}\``).join(" ") || "No Aliases"}
                `)
                embed.setColor(color)
                embed.setFooter("Syntaxes: <> = required | [] = optional")
                message.channel.send(embed);
            } else {
                message.channel.send(`<:xmark:314349398824058880> **help: unknown command '${args[0]}'**`)
            }
        }
    }
}

module.exports.config = {
    name: "help",
    description: "Shows every single command or the info about a command",
    usage: "help [command]",
    category: "Info",
    example: "help fun",
    accessableby: "Everyone",
    aliases: ["cmds", "commands", "h"]
}