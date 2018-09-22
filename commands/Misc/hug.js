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
        await fetch('https://nekos.life/api/v2/img/cuddle').then(res => res.json()).then(body => {
            const embed = new MessageEmbed()
            .setTimestamp()
            .setImage(body.url)
            .setColor('RANDOM');
            return message.sendMessage(`***${user} was hugged by ${message.author}!***`, { embed: embed });
        });
    }

};