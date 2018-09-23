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

const { Command, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

/**
 * https://dev.twitch.tv/docs/v5/guides/authentication/
 */
const query = new URLSearchParams([['client_id', 'CLIENT_ID_HERE']]);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: false,
			description: 'Returns information on a Twitch.tv Account',
			usage: '<name:str>'
		});
		this.timestamp = new Timestamp('DD-MM-YYYY');
	}

	async run(message, [twitchName]) {
		const url = new URL(`https://api.twitch.tv/kraken/channels/${encodeURIComponent(twitchName)}`);
		url.search = query;

		const body = await fetch(url)
			.then(response => response.json())
			.catch(() => { throw 'Unable to find account. Did you spell it correctly?'; });

		const creationDate = this.timestamp.display(body.created_at);
		const embed = new MessageEmbed()
			.setColor(6570406)
			.setThumbnail(body.logo)
			.setAuthor(body.display_name, 'https://i.imgur.com/OQwQ8z0.jpg', body.url)
			.addField('Account ID', body._id, true)
			.addField('Followers', body.followers, true)
			.addField('Created On', creationDate, true)
			.addField('Channel Views', body.views, true);

		return message.sendEmbed(embed);
	}

};
