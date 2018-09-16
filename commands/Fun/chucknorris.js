const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['chucknorrisjoke'],
			description: 'Chuck Norris has some good jokes.'
		});
	}

	async run(message) {
		const joke = await fetch('http://api.chucknorris.io/jokes/random')
			.then(response => response.json())
			.then(body => body.value);
		return message.sendMessage(`**😁 Chuck Norris Joke:** ${joke}`);
	}

};
