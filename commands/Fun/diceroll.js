const { Command } = require('klasa');
const defaultMaxAmount = 6;

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['dr'],
			description: 'Gives you a random dice roll from 1-10.',
			usage: 'maxAmount:int{1}'
		});
	}

	run(message, [maxAmount]) {
        	return message.reply(`Number rolled is... ${Math.floor(Math.random() * maxAmount || defaultMaxAmount)}`);
	}

};
