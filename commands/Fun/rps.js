const { Command } = require('klasa');
const choices = ['rock', 'paper', 'scissors'];

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Play a game of rock, paper, scissors with the bot.',
			usage: '<rock|r|paper|p|scissor|s>'
		});
	}

	async run(message, [action]) {
        const outcome = choices[Math.floor(Math.random() * choices.length)];
        const choice = action.toLowerCase();
	        switch (action) {
            case 'rock':
                switch (outcome) {
                    case 'rock':
                        return message.sendMessage('***Rock! That\'s a tie!***');
                    case 'paper':
                        return message.sendMessage('***Paper! I win, you loose!***');
                    case 'scissor':
                        return message.sendMessage('***Scissors! No! You won...***');
                };
                break;
            case 'paper':
                switch (outcome) {
                    case 'rock':
                        return message.sendMessage('***Rock! That\'s a tie!***');
                    case 'paper':
                        return message.sendMessage('***Paper! I win, you loose!***');
                    case 'scissor':
                        return message.sendMessage('***Scissors! No! You won...***');
                }
            case 'scissors':
                switch (outcome) {
                    case 'rock':
                        return message.sendMessage('***Rock! That\'s a tie!***');
                    case 'paper':
                        return message.sendMessage('***Paper! I win, you loose!***');
                    case 'scissor':
                        return message.sendMessage('***Scissors! No! You won...***');
                }
        }
	}

};
