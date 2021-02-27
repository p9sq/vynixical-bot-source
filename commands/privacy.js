module.exports.run = async (bot, message, args) => {
    return message.channel.send(`
**What information does this bot collect?**
- This bot will store server ID's, User ID's, channel ID's, and role ID's in the database used for this bot (MongoDB / Mongoose).

**Why does this information need to be collected?**
- All of these ID's need to be collected for the config commands to work / function properly.

**Will this bot share any private information?**
- No, this bot won't share your location / IP / Address / Email / Password, etc, this bot only collects ID's from servers, roles, channels and users.

**Want to ask a question / report a bug?**
- If you want to ask a question about the bot, or report a bug, make sure to join our discord server!
    `)
  };
  
  module.exports.config = {
    name: "privacy",
    description: "Shows the bots privacy policy",
    usage: "privacy",
    category: "Info",
    example: "privacy",
    accessableby: "Everyone",
    aliases: ["privacypolicy", "prpol"],
  };
  