const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
  name: "coin",
      aliases: ['코인'],
  description: "money",

  async run (client, message, args) {

    const user = message.mentions.members.first() || message.member

    let name = client.emojis.cache.get('777075390484447252')
    let card = client.emojis.cache.get('777042273350713354')
    
      let balance = await db.get(`wallet_${message.author.id}`)
      let bank = await db.get(`bank_${message.author.id}`)

      if(balance === null) balance = 0
      if(bank === null) bank = 0

      let moneuEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}님의 코인정보 입니다.`, message.author.displayAvatarURL())
      .setDescription(`${name} 닉네임 : ${message.author.username}\n${card} 아이디 : ${message.author.id}\n📑 역할 : ${user.roles.highest.id === message.guild.id ? 'None' : user.roles.highest.name}\n💸 소지하고 있는 코인 : ${balance}\n💰 은행에 있는 코인 : ${bank}`)
      .setColor("#0a0a0a")
      .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
      message.channel.send(moneuEmbed)
      }
}
      