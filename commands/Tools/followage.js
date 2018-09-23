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

/**
 * https://dev.twitch.tv/docs/v5/guides/authentication/
 */
const query = new URLSearchParams([['client_id', 'CLIENT_ID_HERE']]);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: false,
			description: 'Shows the followage of a given user from a given twitch channel.',
			usage: '<name:str> <channel:str>',
			usageDelim: ' '
		});
	}

	async run(message, [twitchName, channelName]) {
		const url = new URL(`https://api.twitch.tv/kraken/users/${encodeURIComponent(twitchName)}/follows/channels/${channelName}`);
		url.search = query;

		const body = await fetch(url)
			.then(response => response.json())
			.catch(() => { throw `${twitchName} isn't following ${channelName}, or it is banned, or doesn't exist at all.`; });
		const days = this.differenceDays(new Date(body.created_at), new Date());
		return message.sendEmbed(new MessageEmbed()
			.setColor(6570406)
			.setAuthor(`${twitchName} has been following ${channelName} for ${days} days.`, body.channel.logo));
	}

	differenceDays(first, second) {
		return (second - first) / (1000 * 60 * 60 * 24);
	}

};
