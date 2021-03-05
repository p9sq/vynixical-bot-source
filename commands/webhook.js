module.exports.run = async (bot, message, args) => {
  if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS"))
    return message.channel.send(
      "I don't have the `MANAGE_WEBHOOKS` permission!"
    );
  let content = args.join(" ");
  if (!content) return message.channel.send("Please provide some text!");
  if(typeof content === "string") {
    content = content.replace(new RegExp(content, "g"), "")
  }
  message.delete();
  message.channel
    .createWebhook(message.author.username, {
      avatar: `${message.author.avatarURL({ format: "png" })}`,
    })
    .then((webhook) => {
      webhook.send(content);
      webhook.send("*This webhook will be deleted in 4 seconds...*");
      setTimeout(() => {
        webhook
          .delete()
          .catch((err) => console.log(`An error occured: ${err}`));
        message.channel
          .send("Webhook was successfully deleted!")
          .then((msg) => msg.delete({ timeout: 4000 }));
        message.channel.bulkDelete(2);
      }, 4000);
    });
};

module.exports.config = {
  name: "webhook",
  description:
    "Creates a webhook of yourself and sends anything you like into the channel then deletes the same webhook after 4 seconds",
  usage: "webhook <text>",
  category: "Fun",
  example: "webhook Hello World",
  accessableby: "Everyone",
  aliases: [],
};
