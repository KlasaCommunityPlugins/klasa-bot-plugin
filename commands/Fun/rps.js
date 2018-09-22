const { Command } = require('klasa');
const choices = ['rock', 'paper', 'scissors'];

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Play a game of rock, paper, scissors with the bot.',
			usage: '<move:string>'
		});
	}

	async run(message, [move]) {
		if (!move.match(/Rock|Paper|Scissors/i)) return message.reply('That\'s an invalid move, please choose `rock`. `paper` or `scissors`.');
        const outcome = choices[Math.floor(Math.random() * choices.length)];
        const choice = move.toLowerCase();
        if (choice === 'rock') {
            if (outcome === 'rock') return message.reply('***Rock! That\'s a tie!***');
            if (outcome === 'paper') return message.reply('***Paper! I win, you loose!***');
            if (outcome === 'scissors') return message.reply('***Scissors! No! You won...***');
        }
        if (choice === 'paper') {
            if (outcome === 'rock') return message.reply('***Rock! No! You won...***');
            if (outcome === 'paper') return message.reply('***Paper! Yeah! That\'s a tie!***');
            if (outcome === 'scissors') return message.reply('***Scissors! I win, you loose!***');
        }
        if (choice === 'scissors') {
            if (outcome === 'rock') return message.reply('***Rock! I win, you loose!***');
            if (outcome === 'paper') return message.reply('***Paper! No! You won...***');
            if (outcome === 'scissors') return message.reply('***Scissors! Yeah! That\'s a tie!***');
        }
	}

};