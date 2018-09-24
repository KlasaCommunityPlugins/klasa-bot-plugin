const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Removes a song with a youtube URL from the playlist.',
			usage: '<url:url>',
		});
	}

	async run(message, [url]) {
		if (!message.guild.settings.music.playlist.includes(url)) return message.sendMessage(`This song is not in the playlist silly :). I can't remove something if its not in there hehe.`);

		const { errors } = await message.guild.settings.update('music.playlist', url, { action: 'remove' });
		if (errors.length) {
			this.client.emit('error', errors.join('\n'));
			return message.sendMessage('I was unable to remove the song properly at this time. Please try again later or a different song.');
		}

		return message.sendMessage(`The <${url}> has been removed from the playlist.`);
	}

};
