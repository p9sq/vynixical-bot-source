module.exports.run = async (bot, message, args) => {
    const responses = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
    ]
    const response = responses[Math.floor(Math.random()*(responses.length))]
    message.channel.send("🎲 Rolling...").then((msg)=> {
        setTimeout(() => {
            msg.edit(`Your dice landed on ${response}!`);
        }, 4000)
    }) 
}

module.exports.config = {
    name: "roledice",
    description: "Rolls a dice",
    usage: "roledice",
    category: "Fun",
    example: "roledice",
    accessableby: "Everyone",
    aliases: ["role-a-dice", "dicerole"]
}