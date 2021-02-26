module.exports.run = async (bot, message, args) => {
  const channel = message.channel;
  channel.createInvite({ unique: true }).then((invite) => {
    message.channel.send(
      "Hey " +
        `${message.author.username}` +
        "! I've created you an invite to share with you're friends! (The invite only lasts a day)\nhttps://discord.gg/" +
        invite.code
    );
  });
};

module.exports.config = {
  name: "serverinvite",
  description: "Creates an invite for the server",
  usage: "serverinvite",
  category: "Fun",
  example: "serverinvite",
  accessableby: "Everyone",
  aliases: ["invitechannel", "channelinvite"],
};
