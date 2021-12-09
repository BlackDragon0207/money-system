const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: "buy",
      aliases: ['구매'],
  description: "money",

  async run (client, message, args) {
    const card = client.emojis.cache.get('777042273350713354')
    const name = client.emojis.cache.get('777009105356718112')

      let author = await db.get(`wallet_${message.author.id}`)
    if(author === null) author = 0;

      if(!args[0]) {
          message.channel.send('구매할 상품을 선택하셔야 합니다!')
      }

      if(args[0] === "1번") {
        if(author < 5000) {
            message.reply("님 해당 상품을 구매하지 못했습니다!\n💳 해당 상품을 구매 하실 코인이 부족합니다!\n> 💸 필요한 코인 : 5,000코인")
        } else {
            message.channel.send("🎉 상품을 구매하였습니다!")
            db.subtract(`wallet_${message.author.id}`, 5000)
            let role = message.guild.roles.cache.find(r => r.id === "888703568280952842"); 

            message.member.roles.add(role);

            const Embed = new Discord.MessageEmbed()
            .setTitle('🔔 흑룡코인 상점 알림')
            .setColor("GREEN")
            .setTimestamp()
            .setDescription(`${name} **유저 닉네임:** ${message.author.tag}\n${card} **유저 아이디:** ${message.author.id}\n💸 **구매 상품: 1번 상품**`)
            
            const log = client.channels.cache.get('889124735596781608')
            log.send(Embed)
        }
    }
}
}