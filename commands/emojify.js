module.exports.run = async (bot, message, args) => {
    const mapping = {
        " ": " ",
        "0": ":zero:",
        "1": ":one:",
        "2": ":two:",
        "3": ":three:",
        "4": ":four:",
        "5": ":five:",
        "6": ":six:",
        "7": ":seven:",
        "8": ":eight:",
        "9": ":nine:",
        "!": ":grey_exclamation:",
        "?": ":grey_question:",
        "#": ":hash:",
        "*": ":asterisk:",
    }

    "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
        mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`
    })

    if(!args.join(" ")) return message.channel.send("Please specify a message to emojify!")
    message.channel.send(args.join(" ").split("").map(c => mapping[c] || c).join(""))
}

module.exports.config = {
    name: "emojify",
    description: "Converts your text to emojis",
    usage: "emojify <message>",
    category: "Fun",
    example: "emojify Hello World",
    accessableby: "Everyone",
    aliases: ["emojimsg"]
}