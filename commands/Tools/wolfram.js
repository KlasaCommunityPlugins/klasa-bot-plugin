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
const fetch = require('node-fetch');

/**
 * https://account.wolfram.com/auth/create
 */
const wolframAppID = 'CLIENT_ID_HERE';

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: false,
			description: 'Query Wolfram Alpha with any mathematical question.',
			usage: '<query:str>'
		});
	}

	async run(message, [query]) {
		const url = new URL('http://api.wolframalpha.com/v2/query');
		url.search = new URLSearchParams([
			['input', query],
			['primary', true],
			['appid', wolframAppID],
			['output', 'json']
		]);

		const pods = await fetch(url)
			.then(response => response.json())
			.then(body => body.queryresult.pods)
			.catch(() => { throw 'There was an error. Please try again.'; });

		if (!pods || pods.error) throw "Couldn't find an answer to that question!";

		return message.sendMessage([
			`**Input Interpretation:** ${pods[0].subpods[0].plaintext}`,
			`**Result:** ${pods[1].subpods[0].plaintext.substring(0, 1500)}`
		].join('\n'));
	}

};
