const Discord = require("discord.js");
const guildprefix = require("../models/prefix");
const { color } = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if(args[0]) {
        const choices = ["rock", "paper", "scissors"];
        const botChoice = choices[Math.floor(Math.random() * 3)];
        const playerChoice = args[0]

        if(!choices.includes(playerChoice)) return message.channel.send("Invalid choices...");
    
        let gameMsg = "";
        const embed = new Discord.MessageEmbed()
        embed.setColor("RANDOM")
        if(botChoice == playerChoice) {
            gameMsg = "It's a tie!";
        } else if(botChoice == "rock") {
            if(botChoice = "paper") gameMsg = "You lose...";
            if(botChoice == "scissors") gameMsg = "You win!";
        } else if(playerChoice = "paper") {
            if(botChoice = "rock") gameMsg = "You win!";
            if(botChoice == "scissors") gameMsg = "You lose...";
        } else if(playerChoice = "scissors") {
            if(botChoice == "rock") gameMsg = "You lose...";
            if(botChoice == "paper") gameMsg = "You win!";
        } else {
        gameMsg = "Invalid answer. Try again...";
        }

            embed.setDescription(`
            Player: ${message.author.tag} | ${playerChoice}
            Bot: ${bot.user.tag} | ${botChoice}
            Result: ${gameMsg}
            `)
            embed.setColor(color)
            embed.setTimestamp()
            message.channel.send(embed);
    } else {
        const embed = new Discord.MessageEmbed()
        guildprefix.findOne({guildID: message.guild.id, guildName: message.guild.name, guildOwner: message.guild.owner.user.tag}, (err, data) => {
        embed.setColor(color)
        embed.setDescription(`Pick one: \`Rock\`, \`Paper\`, or \`Scissors\`. Make sure to type it in again after *${data.prefix}rps*`)
        message.channel.send(embed)
    })
    }
}

module.exports.config = {
    name: "rps",
    description: "Rock Paper Scissors Game",
    usage: "rps <choice>",
    category: "Fun",
    example: "rps paper",
    accessableby: "Everyone",
    aliases: ["rockpaperscissors", "paperscissorsrock"]
}