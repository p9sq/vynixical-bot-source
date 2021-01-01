module.exports.run = async (bot, message, args) => {
    let responses = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
    ]
    let response = responses[Math.floor(Math.random()*(responses.length))]
    message.channel.send("🎲 Rolling...").then((msg)=> {
        setTimeout(function(){
        msg.edit(`Your die landed on ${response}!`);
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