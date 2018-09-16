const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const HTMLParser = require('fast-html-parser');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Gets a random FML story.',
			nsfw: true,
		});
	}

	async run(message) {
		const root = await fetch('http://www.fmylife.com/random')
			.then(result => result.text())
			.then(HTMLParser.parse);
		const article = root.querySelector('.block a');
		const downdoot = root.querySelector('.vote-down');
		const updoot = root.querySelector('.vote-up');

		if (article.childNodes[0].text.length < 5) {
			return message.sendMessage('Today, something went wrong, so you will have to try again in a few moments. FML again.');
		}

		return message.sendEmbed(new MessageEmbed()
			.setTitle(`Requested by ${message.author.tag}`)
			.setAuthor('FML Stories')
			.setColor(message.member.displayColor)
			.setTimestamp()
			.setDescription(`_${article.childNodes[0].text}\n\n_`)
			.addField('I agree, your life sucks', updoot.childNodes[0].text, true)
			.addField('You deserved it:', downdoot.childNodes[0].text, true));
	}

};
