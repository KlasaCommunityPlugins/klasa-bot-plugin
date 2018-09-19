const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 6,
			runIn: ['text'],
			description: 'Send a message to a channel through the bot.',
			usage: '[channel:channel] <content:string> [...]',
			usageDelim: ' '
		});
	}

	async run(message, [channel = message.channel, ...content]) {
		if (channel.guild !== message.guild) throw 'You can\'t echo in other servers!';
		if (!channel.postable) throw 'The selected channel is not postable.';
		return channel.send(content.join(' '));
	}

};
