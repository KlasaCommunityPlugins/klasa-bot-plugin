const { Command } = require('klasa');
const ytdl = require('ytdl-core');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Make the bot join a voice channel.',
			usage: '[amount:int{1}]',
		});
	}

	async run(message, [amount = 1]) {
		const { playlist } = message.guild.settings.playlist;

		if (amount > playlist.length) throw message.sendMessage(`You can't skip more songs than currently in the playlist, silly!`);

		const remainingSongsInPlaylist = playlist.splice(amount);

		const { errors } = await message.guild.settings.update('music.playlist', remainingSongsInPlaylist, { action: 'overwrite' });

		if (errors.length) {
			this.client.emit('error', errors.join('\n'));
			return message.sendMessage('There was an error with updating the playlist settings. Please try again later.');
		}

		const nextSongInPlaylist = remainingSongsInPlaylist[0];
		const playingNow = await joinedVoiceChannel.play(ytdl(nextSongInPlaylist, { filter: 'audioonly' }));
		if (!playingNow) return message.sendMessage(`Unable to play the song ${nextSongInPlaylist}.`);

		return message.sendMessage(`${amount} songs have been skipped in the playlist and now playing ${nextSongInPlaylist}`);
	}

};
