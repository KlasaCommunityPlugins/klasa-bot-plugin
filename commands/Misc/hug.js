const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            usage: '<member:membername>',
            description: 'Hugs the mentioned user and sends an image in chat.'
        });
    }

    async run(message, [member]) {
        if (member.id === message.author.id) return message.sendMessage(`**You can't hug yourself, silly!**`);

        const { url } = await fetch('https://nekos.life/api/v2/img/cuddle').then(res => res.json());

        const embed = new MessageEmbed()
            .setTimestamp()
            .setImage(url)
            .setColor(message.member.roles.highest.color);

        return message.sendEmbed(embed, `***${member} was hugged by ${message.author}!***`);
    }
};
