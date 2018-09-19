const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['dr'],
			description: 'Gives you a random dice roll from 1-10.',
		});
	}

	run(message) {
        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        return message.reply(`number rolled is... ${numbers[Math.floor(Math.random() * numbers.length)]}`);
	}

};
