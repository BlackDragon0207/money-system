const Discord = require('discord.js');

module.exports = {
    name: "help",
        aliases: ['λμλ§'],
    description: "The help command, what do you expect?",

    async run (client, message, args){
        const embed = new Discord.MessageEmbed()
        .setColor(`#111010`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle(`πΈ BlackDragon Community Money Info`)
        .setFooter('λ λͺλ Ήμ΄ λμλ§ μλλ€!', client.user.displayAvatarURL())
        .addField("π λͺλ Ήμ΄ μμλ 'νλ£‘μ'λ₯Ό λΆμ΄μμΌ ν©λλ€π", `\`\`\`- λμλ§\n- λ\n- λλ°κΈ°\n- μν\n- μΈμΆ\n- λκΈ°λΆ\n- λμ λμ§κΈ°\n- μ¬λ‘―\n- λ­νΉ\`\`\``)
        message.channel.send(embed)
    }
}