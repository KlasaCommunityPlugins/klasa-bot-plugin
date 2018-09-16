const { Extendable } = require('klasa');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: ['Message'] });
	}

	async extend(question, time = 60000, embed) {
		await (embed ? this.send(question, { embed }) : this.send(question));
		return this.channel.awaitMessages(message => message.author.id === this.author.id,
			{ max: 1, time, errors: ['time'] })
			.then(messages => messages.first().content)
			.catch(() => false);
	}

};
