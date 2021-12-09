const Discord = require('discord.js');
const { fstat } = require('fs');
const db = require('quick.db');
const money = require('../money/money');

module.exports = {
  name: "slot",
      aliases: ['슬롯'],
  description: "money",

  async run (client, message, args) {
    let topemojis = [':grapes: :grapes: :grapes:', ':apple: :apple: :apple:', ':tangerine: :tangerine: :tangerine:']
    let top = topemojis[Math.floor(Math.random()* topemojis.length)]
    let midemojis = [':grapes: :grapes: :apple:', ':apple: :apple: :grapes:', ':tangerine: :tangerine: :apple:']
    let mid = midemojis[Math.floor(Math.random()* midemojis.length)]
    let bottomemojis = [':tangerine: :apple: :grapes:', ':grapes: :apple: :tangerine:', ':apple: :grapes: :tangerine:']
    let bottom = bottomemojis[Math.floor(Math.random()* bottomemojis.length)]


    let slotsTimeout = 100
    let slots = db.get(`slots_${message.author.id}`)

    if(slots != null && slotsTimeout - (Date.now() - slots) > 0) {
        const ms = require("pretty-ms")     
        const time = ms(slotsTimeout - (Date.now() - slots))
        message.channel.send(`슬롯 다시 사용 가능 시간 | ${time}`)
    } else {
        let emojis;
        let color;
        let amount = Math.floor(Math.random() * 2000) - 1000
        if(amount > 499) emojis = top
        if(amount < 500 && amount > 0) emojis = mid
        if(amount < 1) emojis = bottom
        if(amount > 0) color = "GREEN"
        if(amount < 0) color = "RED"

        let user = message.author
        let embed = new Discord.MessageEmbed()
        
        .setTitle(`[ 흑룡 상점 ] ${message.author.username}님의 슬롯`)
        .setColor(color)
        .setDescription(`얻은 코인 | ${amount}`)
        .addField(`슬롯`, emojis)
        message.channel.send(embed)
         db.add(`wallet_${message.author.id}`, amount)
         db.set(`slots_${message.author.id}`, Date.now())
    }
}}