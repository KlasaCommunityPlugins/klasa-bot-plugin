const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['hb'],
			description: 'Upload code or text to hastebin.',
			usage: '<code:str>'
		});
	}

	async run(message, [code]) {
		const key = await fetch('https://hastebin.com/documents', { method: 'POST', body: code })
			.then(response => response.json())
			.then(body => body.key);
		return message.sendMessage(`https://hastebin.com/${key}`);
	}

};
