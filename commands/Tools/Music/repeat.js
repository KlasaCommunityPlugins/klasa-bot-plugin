const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Make the bot join a voice channel.',
			usage: '[playlist|list|queue|q]',
		});
	}

	async run(message, [repeatPlaylist]) {
		const repeatOption = repeatPlaylist ? 'repeatPlaylist' : 'repeatOne'

		const { errors } = await message.guild.settings.update(`music.${repeatOption}`, !message.guild.settings.music[repeatOption]);
		if (errors.length) {
			this.client.emit('error', errors.join('\n'));
			return message.sendMessage('There was an error with updating the repeat settings. Please try again later.');
		}

		return message.sendMessage(`The queue has now been set to repeat ${repeatPlaylist ? 'the entire playlist' : 'this song'}.`);
	}

};
