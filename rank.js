const { Discord, Collection, MessageEmbed } = require('discord.js');
const { normalizeUnits } = require('moment');
const db = require('quick.db');
const newDownload = require('ytdl-core-discord');

module.exports = {
  name: "rank",
      aliases: ['랭킹'],
  description: "money",

  async run (client, message, args) {
      let collection = new Collection();
      
      await Promise.all(
          message.guild.members.cache.map(async(member) => {
              const id = member.id;
              const balance = await db.get(`wallet_${id}`)
              console.log(`${member.user.tag} -> ${balance}`)
              return balance !== 0 ? collection.set(id, {
                  id,
                  balance,
              })
              : null;
          })
      );

      const data = collection.sort((a, b) => b.balance - a.balance).first(10);
      
      message.channel.send(
          new MessageEmbed()
      .setTitle(`${message.guild.name} 서버 코인 랭킹`)
      .setColor(`#0a0a0a`)
          .setDescription(
              data.map((v, i) => {
                  return `${i+1}. ${client.users.cache.get(v.id).tag} => **${
                      v.balance
                    } 코인**`;
                })
          )
      )
        }
      
};