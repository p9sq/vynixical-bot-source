const Discord = require("discord.js");
const guildprefix = require("../models/prefix");
const { color, owners } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let categories;
    if(!args[0]) {
        let embed = new Discord.MessageEmbed()
        guildprefix.findOne({guildID: message.guild.id, guildName: message.guild.name, guildOwner: message.guild.owner.user.tag}, (err, data) => {
            embed.setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            embed.setTitle(`${bot.user.username}'s available commands!`)
            embed.setColor(color)
            embed.setThumbnail(`${bot.user.avatarURL({size: 2048, format: "png"})}`)
            embed.setDescription(`[Add bot to server](https://discord.com/api/oauth2/authorize?client_id=725582436477698118&permissions=8&scope=bot), [Support Server](https://discord.gg/sr2JWV6)`)
            // bot.utils.insertCommands(bot, embed)
	        if(!owners.includes(message.author.id)) {
		        categories = removeDuplicates(bot.commands.filter(cmd => cmd.config.category !== "Developer").map(cmd => cmd.config.category));
	        } else {
		        categories = removeDuplicates(bot.commands.map(cmd => cmd.config.category));
	        }

	        for (const category of categories) {
		        embed.addField(category, bot.commands.filter(cmd => cmd.config.category === category).map(cmd => `\`${cmd.config.name}\``).join(", "));
	        }
            embed.setFooter(`${bot.user.username} | For more help, do ${data.prefix}help [command]`, bot.user.displayAvatarURL({format: "png"}))
            embed.setTimestamp()
        message.channel.send(embed)
        })
    } else {
        if(args[0]) {
            let command = args[0];
    
            if(bot.commands.has(command)) {

                command = bot.commands.get(command);
                let embed = new Discord.MessageEmbed()
                embed.setAuthor(`${bot.utils.capitalizeFirstLetter(command.config.name)} Command`, message.guild.iconURL({dynamic: true, size: 2048, format: "png"}))
                embed.setDescription(`
                **Description:** \`${command.config.description || "No description"}\`
                **Usage:** \`${command.config.usage || "No usage"}\`
                **Category:** \`${command.config.category || "No Category"}\`
                **Example:** \`${command.config.example || "No Example"}\`
                **Accessable by:** \`${command.config.accessableby || "Everyone"}\`
                **Aliases:** \`${command.config.aliases.join("`, `") || "No Aliases"}\`
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