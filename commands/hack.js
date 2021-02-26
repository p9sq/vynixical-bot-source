module.exports.run = async (bot, message, args) => {
  const user = message.mentions.users.last();
  if (!user)
    return message.channel.send("Please mention a user to *hack* :wink:");
  const msg = await message.channel.send(
    `<a:loading:393852367751086090> | Hacking ${user.username} now...`
  );
  const ips = [
    "40.2.54.239",
    "145.58.134.145",
    "90.135.87.199",
    "251.224.76.96",
    "94.199.139.255",
  ];
  const ip = ips[Math.floor(Math.random() * ips.length)];
  const emails = [
    `${user.username}@gmail.com`,
    "support@discord.com",
    `${user.username}${user.discriminator}@hotmail.com`,
    `${user.username}.${user.discriminator}@discord.com`,
  ];
  const email = emails[Math.floor(Math.random() * emails.length)];
  const passwords = [
    "DiscordIsCool",
    "selfbotsAreAgainsDiscordTOS",
    "YoMamaIsGay",
    "Password",
    "MyPasswordJustGotLeaked",
  ];
  const password = passwords[Math.floor(Math.random() * passwords.length)];
  const sentences = [
    "I like ya cut g",
    "Can you send me your token?",
    "Can I have your bots source code?",
    `${password} is my password to my discord account... :flushed:`,
    "Your mum is so ugly, that she made my happy meal cry :sunglasses:",
  ];
  const sentence = sentences[Math.floor(Math.random() * sentences.length)];
  setTimeout(() => {
    msg.edit(`<a:loading:393852367751086090> | Found IP: **${ip}**`);
    setTimeout(() => {
      msg.edit(`<a:loading:393852367751086090> | Found Email: **${email}**`);
      setTimeout(() => {
        msg.edit(
          `<a:loading:393852367751086090> | Found Password: **${password}**`
        );
        setTimeout(() => {
          msg.edit(
            `<a:loading:393852367751086090> | Found Username: **${user.username}**`
          );
          setTimeout(() => {
            msg.edit(
              `<a:loading:393852367751086090> | Found Discriminator: **${user.discriminator}**`
            );
            setTimeout(() => {
              msg.edit(
                `<a:loading:393852367751086090> | Found ID: **${user.id}**`
              );
              setTimeout(() => {
                msg.edit(
                  `<a:loading:393852367751086090> | Injecting virus into discriminator **${user.discriminator}**...`
                );
                setTimeout(() => {
                  msg.edit(
                    `<a:loading:393852367751086090> | Reported to discord for selfbotting...`
                  );
                  setTimeout(() => {
                    msg.edit(
                      `<a:loading:393852367751086090> | Fetching DMs...`
                    );
                    setTimeout(() => {
                      msg.edit(
                        `<a:loading:393852367751086090> | Most common sentence: **${sentence}**`
                      );
                      setTimeout(() => {
                        setTimeout(() => {
                          msg.edit(
                            `<a:loading:393852367751086090> | Sold all found data to the government...`
                          );
                          setTimeout(() => {
                            msg.edit(`<:check:314349398811475968> | Complete!`);
                            setTimeout(() => {
                              message.channel.send(
                                `<:check:314349398811475968> | The *totaly* real hack has been successfully completed!`
                              );
                            }, 1000);
                          }, 4000);
                        }, 4000);
                      }, 4000);
                    }, 4000);
                  }, 4000);
                }, 4000);
              }, 4000);
            }, 4000);
          }, 4000);
        }, 4000);
      }, 4000);
    }, 4000);
  }, 4000);
};

module.exports.config = {
  name: "hack",
  description: "*Hacks* the mentioned user 😉",
  usage: "hack <user>",
  category: "Fun",
  example: "hack @Wumpus#0001",
  accessableby: "Everyone",
  aliases: [],
};
