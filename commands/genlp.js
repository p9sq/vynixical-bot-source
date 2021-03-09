module.exports.run = async (bot, message, args) => {
  require("../inlineReply");
  function genLicense() {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let letterString = "";
    let numbers = "0123456789";
    let numberString = "";

    for (var i = 0; i < 3; i++) {
      letterString += letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
    }

    for (var i = 0; i < 3; i++) {
      numberString += numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
    }
    return `${letterString}${numberString}`;
  }

  message.quote(
    `Your generated fake license plate is \`${genLicense()}\``
  );
};

module.exports.config = {
  name: "genlicense",
  description: "Generates a fake license plate",
  usage: "genlicense",
  category: "Fun",
  example: "genlicense",
  accessableby: "Everyone",
  aliases: ["generatelicenseplate", "glp", "randomlicenseplate", "rlp"],
};
