const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "blackdragoncoin",
      aliases: ['관리자'],
  description: "money",

  async run (client, message, args) {
    const dev = ['435800525389430804']
    if(!dev.includes(message.author.id)) return message.reply('당신은 개발자가 아닙니다.');
      const check = await db.get(`dailyCheck_${message.author.id}`);
      const timeout = 1000;
      if(check !== null && timeout - (Date.now() - check) > 0) {
        const ms = require("pretty-ms")
          const timeLeft = ms(timeout - (Date.now() - check))
          message.channel.send(`돈은 하루에 한 번씩 받을 수 있습니다 | 남은시간 : ${timeLeft}`)
      } else {
          let reward = 50000
          let currentBalance = await db.get(`wallet_${message.author.id}`)
          message.channel.send(`${reward.toLocaleString()}원을 지급 받으셨습니다.`)
     
          db.get(`wallet_${message.author.id}`)
          await db.set(`wallet_${message.author.id}`, currentBalance + reward)
          db.get(`dailyCheck_${message.author.id}`)
          await db.set(`dailyCheck_${message.author.id}`, Date.now())
      }
  }
}
      