const { Command } = require('klasa');
const ytdl = require('ytdl-core');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Make the bot join a voice channel.',
			usage: '[channel:voicechannel]',
		});
	}

	async run(message, [channel]) {
		channel = channel || message.member.voice.channel;

		if (!channel.joinable) throw `I do not have the necessary permissions to join this ${channel.name}.`

		const joinedChannel = await channel.join();

		if (!joinedChannel) throw `Unable to join the voice channel at this time. Please try again later.`;

		const { playlist } = message.guild.settings;
		if (!playlist.length) return message.sendMessage(`Successfully joined ${channel.name}`);

		const firstSongInPlaylist = playlist[0];
		const playingNow = await joinedVoiceChannel.play(ytdl(firstSongInPlaylist, { filter: 'audioonly' }));

		if (!playingNow) return message.sendMessage(`Unable to play the song <${firstSongInPlaylist}>.`);

		return message.sendMessage(`Joined ${channel.name} and playing...`);
	}

};
