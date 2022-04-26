const Discord = require('discord.js');

module.exports = {
    name: "help",
        aliases: ['도움말'],
    description: "The help command, what do you expect?",

    async run (client, message, args){
        const embed = new Discord.MessageEmbed()
        .setColor(`#111010`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle(`💸 BlackDragon Community Money Info`)
        .setFooter('돈 명령어 도움말 입니다!', client.user.displayAvatarURL())
        .addField("📌 명령어 앞에는 '흑룡아'를 붙이셔야 합니다📌", `\`\`\`- 도움말\n- 돈\n- 돈받기\n- 은행\n- 인출\n- 돈기부\n- 동전던지기\n- 슬롯\n- 랭킹\`\`\``)
        message.channel.send(embed)
    }
}