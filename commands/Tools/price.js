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

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Compares the value of a currency (crypto, fiat) with another.',
			usage: '<coin:str{1,3}> <currency:str{1,3}> [amount:int{1}]',
			usageDelim: ' '
		});
	}

	async run(message, [coin, currency, amount = 1]) {
		const c1 = coin.toUpperCase();
		const c2 = currency.toUpperCase();

		const body = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${c1}&tsyms=${c2}`)
			.then(response => response.json())
			.catch(() => { throw 'There was an error, please make sure you specified an appropriate coin and currency.'; });
		if (!body[c2]) return message.sendMessage('There was an error, please make sure you specified an appropriate coin and currency.');
		return message.sendMessage(`Current price of ${amount} ${c1} is ${(body[c2] * amount).toLocaleString()} ${c2}`);
	}

};
