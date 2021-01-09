const memberRole = require("../models/memberrole");
const welchannel = require("../models/welchannel");
const weltxt = require("../models/welcometext");
const img = require("../models/img");
const Discord = require("discord.js");
const Canvas = require("canvas");

const applyText = (canvas, text) => {
	const ctx = canvas.getContext("2d");

	let fontSize = 70;

	do {

		ctx.font = `${fontSize -= 10}px sans-serif`;

	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

module.exports = async (guildMemberAdd, member) => {
  const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext("2d");

	const background = await Canvas.loadImage("./wallpaper.png");
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = "#74037b";
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = "28px sans-serif";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("Welcome to the server,", canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.user.username}!`);
	ctx.fillStyle = "#ffffff";
	ctx.fillText(`${member.user.username}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
	ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome-image.png");

    memberRole.findOne({ guildID: member.guild.id }, (err, mr) => {
        if(!mr) {
          return;
        } else {
          member.roles.add(mr.roleID);
        }
      })
    
      welchannel.findOne({ guildID: member.guild.id }, (err, w) => {
        weltxt.findOne({ guildID: member.guild.id }, (err , wt) => {
          img.findOne({ guildID: member.guild.id}, (err, image) => {
          if(!w) {
            return;
          } else {
            const channel = member.guild.channels.cache.get(w.chID);
    
            if(!wt) {
              if(!image) {
                channel.send(`Welcome **${member.user.tag}**, you are member number **${member.guild.memberCount}**! I hope you have a great time in **${member.guild.name}**!`);
              } else {
                channel.send(`Welcome **${member.user.tag}**, you are member number **${member.guild.memberCount}**! I hope you have a great time in **${member.guild.name}**!`, attachment);
              }
            } else {
              const welmsg = wt.msg
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{member}", `${member.user.tag}`)
                .replace("{guild}", `${member.guild.name}`)
                .replace("{memberCount:format}", formatNumber(member.guild.memberCount))
                .replace("{memberCount}", member.guild.memberCount);
              if(!image) {
                channel.send(welmsg);
              } else {
                channel.send(welmsg, attachment);
              }
            }
          }
        })
      })
    })
}

function formatNumber(number) {
  let result;

  if(number === "11") result = `${number}th`;
  if(number === "101") result = `${number}th`;
  if(number === "10") result = `${number}th`;

  if(number.endsWith("0")) result = number;

  if(number === "1") result = "1st";
  if(number === "2") result = "2nd";
  if(number === "3") result = "3rd";
  if(number === "4") result = "4th";
  if(number === "5") result = "5th";
  if(number === "6") result = "6th";
  if(number === "7") result = "7th";
  if(number === "8") result = "8th";
  if(number === "9") result = "9th";
  if(number === "10") result = "10th";

  if(number.endsWith("1")) result = `${number}st`;
  if(number.endsWith("2")) result = `${number}nd`;
  if(number.endsWith("3")) result = `${number}rd`;
  if(number.endsWith("4")) result = `${number}th`;
  if(number.endsWith("5")) result = `${number}th`;
  if(number.endsWith("6")) result = `${number}th`;
  if(number.endsWith("7")) result = `${number}th`;
  if(number.endsWith("8")) result = `${number}th`;
  if(number.endsWith("9")) result = `${number}th`;
  
  return result;
}