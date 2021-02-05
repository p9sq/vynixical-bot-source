const users = require("../models/users");

module.exports.run = async (bot, message, args) => {
    const randomCoins = Math.floor(Math.random() * 99) + 1;
    const chance = Math.floor(Math.random() * 10);
    if(chance >= 6) {
      users.findOne({userID: message.author.id, guildID: message.guild.id}, (err, member) => {
        if(!member) {
            const newcredits = new users({
              userID: message.author.id,
              guildID: message.guild.id
            })
            newcredits.save();
          } else {
            member.balance = member.balance- + -randomCoins;
            member.save();
          }
        message.reply(`Why are you begging?? Take <:vynixical_coin:801956380965732362> ${randomCoins}`)
    })
    } else {
    message.reply(`Sorry, but you don't get any money! Try again later`)
    }
}

module.exports.config = {
    name: "beg",
    description: "Beg for cash $$$",
    usage: "beg",
    category: "Economy",
    example: "beg",
    accessableby: "Everyone",
    aliases: []
}
