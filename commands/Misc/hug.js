const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 5,
            aliases: [],
            usage: '<user:username>',
            description: 'Hugs the mentioned user and sends an image in chat.',
            extendedHelp: ''
        });
    }

    async run(message, [user]) {
        if (user.id === message.author.id) {
            return message.sendMessage(`**You can't hug yourself, silly!**`);
        }
        const { url } = await fetch('https://nekos.life/api/v2/img/cuddle').then(res => res.json());

        const embed = new MessageEmbed()
            .setTimestamp()
            .setImage(url)
            .setColor(message.member.roles.highest.color);
        return message.sendMessage(`***${user} was hugged by ${message.author}!***`, { embed: embed });
    }
};