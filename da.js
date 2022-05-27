const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "moneyadd",
      aliases: ['돈받기'],
  description: "money",

  async run (client, message, args) {
    const check = await db.get(`dailyCheck_${message.author.id}`);
    const timeout = 86400000;
    if(check !== null && timeout - (Date.now() - check) > 0) {
      const ms = require("pretty-ms")
        const timeLeft = ms(timeout - (Date.now() - check))
        message.channel.send(`돈은 하루에 한 번씩 받을 수 있습니다 | 남은시간 : ${timeLeft}`)
    } else {
        let reward = 500
        let currentBalance = await db.get(`wallet_${message.author.id}`)
        message.channel.send(`${reward.toLocaleString()}원을 지급 받으셨습니다.`)
   
        db.get(`wallet_${message.author.id}`)
        await db.set(`wallet_${message.author.id}`, currentBalance + reward)
        db.get(`dailyCheck_${message.author.id}`)
        await db.set(`dailyCheck_${message.author.id}`, Date.now())
    }
}
}
  
    
