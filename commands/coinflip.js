module.exports.run = async (bot, message, args) => {
    var chance = Math.floor(Math.random() * 2);
    if (chance == 0) {
        message.channel.send("<a:Spinning_Coin:713305992762359849> Flipping...").then((msg)=> {
            setTimeout(function(){
            msg.edit("Your coin landed on heads!");
            }, 4000)
        }) 
    } else {
        message.channel.send("<a:Spinning_Coin:713305992762359849> Flipping...").then((msg)=> {
            setTimeout(function(){
            msg.edit("Your coin landed on tails!");
            }, 4000)
        })
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