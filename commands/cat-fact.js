const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    const {body} = await superagent.get(`https://some-random-api.ml/facts/cat`)
    if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
    message.channel.send(body.fact);
}

module.exports.config = {
    name: "cat-fact",
    description: "Sends a random cat fact",
    usage: "cat-fact",
    category: "Info",
    example: "cat-fact",
    accessableby: "Everyone",
    aliases: []
}