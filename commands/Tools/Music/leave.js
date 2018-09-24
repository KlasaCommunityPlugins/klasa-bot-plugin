const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Make the bot leave a voice channel.',
		});
	}

	async run(message) {
		const voiceChannel = message.guild.me.voice.channel;

		if (!voiceChannel) throw `I can not leave a channel if I am not in one silly.`

		voiceChannel.leave();

		return message.sendMessage(`Successfully left the **${voiceChannel.name}** channel.`);
	}

};
