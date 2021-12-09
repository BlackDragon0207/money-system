const Discord = require('discord.js');
const { normalizeUnits } = require('moment');
const db = require('quick.db');
const newDownload = require('ytdl-core-discord');

module.exports = {
  name: "withDrew",
      aliases: ['인출'],
  description: "money",

  async run (client, message, args) {
    const user = message.member
    const bank = db.get(`bank_${user.id}`)
    if(bank === null || bank === 0) return message.reply("코인이 없습니다!");
    if(args[0] === 'all') {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${user.user.username}님 은행`, user.user.displayAvatarURL({ dtnamic: true}))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
        <@${user.user.id}> 은행에 모든 금액인 **${bank}** 코인을 인출 하셨습니다.
        `)
        message.channel.send(embed)
        db.subtract(`bank_${user.id}`, bank)
        db.add(`wallet_${message.author.id}`, bank) 
    } else {
        const amount = args[0]
        if(!amount) message.reply("은행에서 인출할 금액을 설정하셔야 합니다!")
        else if(amount % 1 != 0 || amount <= 0) return message.reply("명령어를 실행하지 못했습니다!")
        else if(amount > bank) return message.reply("명령어를 실행하지 못했습니다!")
        else {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${user.user.username}님 은행`, user.user.displayAvatarURL({ dtnamic: true}))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
            <@${user.user.id}> 은행에서 인출한 금액은 **${amount}** 코인 입니다.
            `)
            message.channel.send(embed)
            db.subtract(`bank_${user.id}`, amount)
            db.add(`wallet_${user.id}`, amount)
        }
    }
  }
}

