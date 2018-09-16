const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const messageLimitHundreds = 1;

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Returns a random message from someone in the channel.',
			requiredPermissions: ['READ_MESSAGE_HISTORY', 'EMBED_LINKS']
		});
	}

	async run(message) {
		let messageBank = await message.channel.messages.fetch({ limit: 100 });
		for (let i = 1; i < messageLimitHundreds; i++) {
			messageBank = messageBank.concat(await message.channel.messages.fetch({ limit: 100, before: messageBank.last().id }));
		}

		const message = messageBank
			.filter(ms => !ms.author.bot && ms.content.replace(/[\W0-9]*/g, '').length >= 20)
			.random();

		if (!message) throw 'Could not find a quote';

		return message.sendEmbed(new MessageEmbed()
			.setDescription(message.content)
			.setAuthor(message.author.username, message.author.displayAvatarURL()));
	}

};
