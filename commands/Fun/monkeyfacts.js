const { Command } = require('klasa');
const { monkeyfacts } = require('../../constants.js')
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
