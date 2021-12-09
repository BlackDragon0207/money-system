const Discord = require('discord.js');
const { normalizeUnits } = require('moment');
const db = require('quick.db');
const newDownload = require('ytdl-core-discord');

module.exports = {
  name: "bank",
      aliases: ['은행'],
  description: "money",

  async run (client, message, args) {
    const user = message.member
    const balance = db.get(`wallet_${user.id}`)
    if(balance === null || balance === 0) return message.reply("코인이 없습니다!");
    if(args[0] === 'all') {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${user.user.username}님 은행`, user.user.displayAvatarURL({ dtnamic: true}))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
        <@${user.user.id}> 은행에 모든 금액인 **${balance}** 코인을 넣었습니다.
        `)
        message.channel.send(embed)
        db.subtract(`wallet_${user.id}`, balance)
        db.add(`bank_${message.author.id}`, balance) 
    } else {
        const amount = args[0]
        if(!amount) message.reply("은행에 넣을 코인을 설정하셔야 합니다!")
        else if(amount % 1 != 0 || amount <= 0) return message.reply("명령어를 실행하지 못했습니다!")
        else if(amount > balance) return message.reply("명령어를 실행하지 못했습니다!")
        else {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${user.user.username}님 은행`, user.user.displayAvatarURL({ dtnamic: true}))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
            <@${user.user.id}> 은행에 넣은 금액은 **${amount}** 코인 입니다.
            `)
            message.channel.send(embed)
            db.subtract(`wallet_${user.id}`, amount)
            db.add(`bank_${user.id}`, amount)
        }
    }
  }
}

