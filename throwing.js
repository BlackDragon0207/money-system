const Discord = require('discord.js');
const { existsSync, realpathSync } = require('fs');
const db = require('quick.db');

module.exports = {
  name: "moneythrowing",
      aliases: ['동전던지기'],
  description: "money",

  async run (client, message, args) {
    const user = message.member
    const balance = db.get(`wallet_${user.id}`)
    let rdmmsg = ["앞", "뒤"]
    let rdmsg = rdmmsg[Math.floor(Math.random() * rdmmsg.length)];
    
    if(balance === null || balance === 0) return message.reply("돈이 없습니다!");

        if(!args[0]) return message.reply("앞면인지 뒷면인지 입력 하셔야 합니다")
        if(!args[1]) message.reply("배팅 하실 금액을 입력 하셔야 합니다")
        else if(args[1] % 1 != 0 || args[1] <= 0) return message.reply("명령어를 실행하지 못했습니다!")
        else if(args[1] > balance) return message.reply("명령어를 실행하지 못했습니다!")
        else {
        if(args[0] == "앞" || args[0] == "뒤") {
            if(rdmsg == "앞" || rdmsg == "뒤") {
                    const embed = new Discord.MessageEmbed()
                    .setAuthor(`${user.user.username}의 동전 던지기`, client.user.displayAvatarURL({ dtnamic: true}))
                    .setTimestamp()
                    .setThumbnail(`https://cdn.discordapp.com/attachments/935045899695050793/967708534848499742/2.png`)
                    .setColor('#0a0a0a')
                    .setDescription(`💾 봇의 선택 : ${rdmsg}\n📑 ${user.user.username}님의 선택 : ${args[0]}\n💰 배팅하신 금액 : ${args[1]}원`)
                    message.channel.send(embed)      
            }
        }        
                   if(rdmsg === args[0]) {
                            setTimeout (() => {
                            const embed2 = new Discord.MessageEmbed()
                            .setAuthor(`😋 ${user.user.username}님 승리!`, user.user.displayAvatarURL({ dtnamic: true}))
                            .setTimestamp()
                            .setThumbnail(`https://cdn.discordapp.com/attachments/935045899695050793/967708729782988810/725297258727473234.gif`)
                            .setColor('GREEN')
                            .setDescription(`💰 배팅하신 금액인 ${args[1]}원의 2배를 얻으셨습니다!`)   
                            message.channel.send(embed2)
                            db.get(`wallet_${user.id}`)
                            db.add(`wallet_${user.id}`, args[1] * 2)  
                            }, 1000)
                } else {          
                            setTimeout (() => {
                                const embed3 = new Discord.MessageEmbed()
                                .setAuthor(`😥 ${user.user.username}님 패배!`, user.user.displayAvatarURL({ dtnamic: true}))
                                .setTimestamp()
                                .setThumbnail(`https://cdn.discordapp.com/attachments/935045899695050793/967708737332736090/725297259994021970.gif`)
                                .setColor('RED')
                                .setDescription(`💰 배팅하신 금액인 ${args[1]}원의 2배를 잃으셨습니다!`)   
                                message.channel.send(embed3)
                                db.get(`wallet_${user.id}`)
                                db.add(`wallet_${user.id}`, args[1] * -2)  
                                }, 1000)
                        }
    }
   
                
            }
        }
