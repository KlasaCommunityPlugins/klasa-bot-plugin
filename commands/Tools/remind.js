const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'creates a reminder',
			usage: '[member:member] <when:time> <text:str> [...]',
			usageDelim: ' '
		});
	}

	async run(message, [member, when, ...text]) {
		if (!member) member = message.member;

		const reminder = await this.client.schedule.create('reminder', when, {
			data: { channel: message.channel.id, user: member.id, text: text.join(' ') }
		});
		return message.sendMessage(`Ok, I created you a reminder with the id: \`${reminder.id}\``);
	}

};
