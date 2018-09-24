const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permissionLevel: 0,
			description: 'Make the bot join a voice channel.',
			usage: '[channel:voicechannel]',
		});
	}

	async run(message, [channel]) {
		channel = channel || message.member.voice.channel;

		if (!channel.joinable) throw `I do not have the necessary permissions to join this ${channel.name}.`

		const joinedChannel = await channel.join();

		if (!joinedChannel) throw `Unable to join the voice channel at this time. Please try again later.`;

		return message.sendMessage(`Successfully joined ${channel.name}`);

	}

};
