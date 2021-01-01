const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    const {body} = await superagent.get(`https://some-random-api.ml/facts/dog`)
    if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
    message.channel.send(body.fact);
}

module.exports.config = {
    name: "dog-fact",
    description: "Sends a random dog fact",
    usage: "dog-fact",
    category: "Info",
    example: "dog-fact",
    accessableby: "Everyone",
    aliases: []
}