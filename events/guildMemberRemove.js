const leavetxt = require("../models/leavetext");
const leavechannel = require("../models/leavechannel");

module.exports = async (guildMemberRemove, member) => {
    leavechannel.findOne({ guildID: member.guild.id } , ( err , lc ) => {
        leavetxt.findOne({ guildID: member.guild.id } , ( err , lt) => {
          if(!lc) {
            return;
          } else {
            const channel = member.guild.channels.cache.get(lc.chanID);
    
            if(!lt) {
              channel.send(`**${member.user.tag}** has just left **${member.guild.name}**!`);
            } else {
              const leavemsg = lt.msg
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
              channel.send(leavemsg)
            }
          }
        })
      })
}