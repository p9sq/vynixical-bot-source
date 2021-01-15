module.exports.run = async (bot, message, args) => {
    var chance = Math.floor(Math.random() * 2);
    const msg = await message.channel.send("<a:spinning_coin:717949437774790787> Flipping...")
    if (chance == 0) {
        setTimeout(() => {
            msg.edit("Your coin landed on heads!")
        }, 4000)
    } else {
        setTimeout(() => {
            msg.edit("Your coin landed on tails!")
        }, 4000)
    }
}

module.exports.config = {
    name: "coinflip",
    description: "Flips a coin",
    usage: "coinflip",
    category: "Fun",
    example: "coinflip",
    accessableby: "Everyone",
    aliases: ["flipcoin", "flip-a-coin"]
}