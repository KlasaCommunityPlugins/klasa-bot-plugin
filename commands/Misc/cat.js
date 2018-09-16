const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['randomcat', 'meow'],
			description: 'Grabs a random cat image from random.cat.'
		});
	}

	async run(message) {
		const file = await fetch('http://aws.random.cat/meow')
			.then(response => response.json())
			.then(body => body.file);
		return message.channel.sendFile(file, `cat.${file.slice(file.lastIndexOf('.'), file.length)}`);
	}

};
