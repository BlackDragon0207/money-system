const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "moneythrowing",
      aliases: ['기부'],
  description: "money",

  async run (client, message, args) {

      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!user) return message.reply("Please mention a user!");

      const coinsToDonate = args[1];
      if(!coinsToDonate)
      return message.reply("돈은 숫자로 표시해야 합니다!");
      else if(coinsToDonate % 1 != 0 || coinsToDonate <= 0) return message.reply("명령어를 실행하지 못했습니다!")

      if(isNaN(coinsToDonate))
      return message.reply("돈은 숫자로 표시해야 합니다!");

      const convertedDonation = parseInt(coinsToDonate);
      if((await db.get(`wallet_${message.author.id}`)) < convertedDonation)
      return message.reply("돈이 부족합니다!");

      db.get(`wallet_${message.author.id}`)
      await db.subtract(`wallet_${message.author.id}`, convertedDonation)
      db.get(`wallet_${user.id}`)
      await db.add(`wallet_${user.id}`, convertedDonation)

      message.channel.send(`${message.author}님께서 ${convertedDonation}원을 ${user}님에게 기부하셨습니다`)

  }
}
