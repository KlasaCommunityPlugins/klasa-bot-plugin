const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'View the current playlist.',
		});
	}

	async run(message) {
		const { playlist } = message.guild.settings;

		return message.sendMessage(playlist.map((song, index) => `${index}: <${song}>`).join('\n'));
	}

};
