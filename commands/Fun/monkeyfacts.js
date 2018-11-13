const { Command } = require('klasa');
const { array: { monkeyfacts } } = require('../../array.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['mf'],
			description: 'Gives you a random monkey fact',
		});
	}

	run(message) {
        return message.sendMessage(monkeyfacts[Math.floor(Math.random() * monkeyfacts.length)]);
	}

};
