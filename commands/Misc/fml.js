/*
MIT License

Copyright (c) 2017-2018 dirigeants

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

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
