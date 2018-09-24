const { Command } = require('klasa');
const ytdl = require('ytdl-core');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Plays a song with a youtube URL.',
			usage: '[url:url]',
		});
	}

	async run(message, [url]) {
		const isValidYoutubeURL = await ytdl.validateURL(url);
		if (!isValidYoutubeURL) throw `The Youtube API says that <${url}> is not a valid Youtube URL. Please try another URL.`

		const { errors } = await message.guild.settings.update('music.playlist', url, { action: 'add' });
		if (errors.length) {
			this.client.emit('error', errors.join('\n'));
			return message.sendMessage('I was unable to add this song to the playlist. I am so sorry. Please try again later.')
		}
		const botVoiceChannel = message.guild.me.voice.channel;
		const memberVoiceChannel = message.member.voice.channel;

		if (!botVoiceChannel && !memberVoiceChannel) return message.sendMessage('Since neither you nor me are in a voice channel, I have added the song to the playlist. Invite me to a voice channel with the **join** command to listen to the song.');
		else if (!botVoiceChannel && memberVoiceChannel) {
			if (!memberVoiceChannel.joinable) return message.sendMessage(`I am not able to join the ${memberVoiceChannel.name} channel, so I have add this song to the playlist. Please grant me the permissions to join the voice channel then type the play command again.`);

			const youtubeVideoInfo = await ytdl.getInfo(url);
			if (!youtubeVideoInfo) return message.sendMessage(`I was not able to get this song from YouTube. Please try again later or a different URL.`);

			const joinedVoiceChannel = await memberVoiceChannel.join();

			const playingNow = await joinedVoiceChannel.play(ytdl(url, { filter: 'audioonly' }));
			if (!playingNow) return message.sendMessage(`Unable to play the song ${url}.`);

			return message.sendMessage(`Playing...`);
		}

		return message.sendMessage('I have added this song to the playlist since I am already playing a song');
	}

};
