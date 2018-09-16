const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['catfact', 'kittenfact'],
			description: 'Let me tell you a misterious cat fact.'
		});
	}

	async run(message) {
		const fact = await fetch('https://catfact.ninja/fact')
			.then(response => response.json())
			.then(body => body.fact);
		return message.sendMessage(`📢 **Catfact:** *${fact}*`);
	}

};
