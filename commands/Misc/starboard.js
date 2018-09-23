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

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['star'],
			permissionLevel: 6,
			runIn: ['text'],
			requiredSettings: ['starboard'],
			description: 'Stars a message.',
			usage: '<messageid:msg>'
		});

		this.provider = null;
		this.timestamp = new Timestamp('DD/MM/YYYY [@] HH:mm:ss');
	}

	async run(message, [selectedMessage]) {
		const channel = this.getChannel(message.guild);
		await this.sendStar(message, selectedMessage, channel);
		await message.react('⭐').catch(() => null);
		return message.sendMessage('Successfully starred!');
	}

	async sendStar(message, selectedMessage, channel) {
		if (!await this.provider.has('starboard', message.guild.id)) await this.provider.create('starboard', message.guild.id, JSON.stringify([]));

		const messageArray = await this.provider.get('starboard', message.guild.id);
		if (messageArray.includes(selectedMessage.id)) throw 'This message has already been starred.';
		else if (message.author === selectedMessage.author) throw 'You cannot star yourself.';

		const options = {};
		if (selectedMessage.attachments.first()) options.files = selectedMessage.attachments.map(a => ({ name: a.filename, attachment: a.url }));

		await channel.send(this.generateMessage(selectedMessage), options);
		messageArray.push(selectedMessage.id);
		await this.provider.update('starboard', message.guild.id, { messages: JSON.stringify(messageArray) });
	}

	getChannel(guild) {
		const channel = guild.channels.find(channel => channel.name === "starboard");
		if (!channel) throw 'Please create the _starboard_ channel and try again.';
		if (channel.postable === false) throw `I require the permission SEND_MESSAGES to post messages in ${channel} channel.`;
		return channel;
	}

	generateMessage(message) {
		const starTime = this.timestamp.display(message.createdTimestamp);
		const starFooter = `${message.author.tag} in #${message.channel.name} (ID: ${message.id})`;
		return `⭐ ${message.cleanContent}\n\n- ${starTime} by ${starFooter}`;
	}

	async init() {
		this.provider = this.client.providers.default;

		if (!await this.provider.hasTable('starboard')) {
			const SQLCreate = ['id TEXT NOT NULL UNIQUE', "messages TEXT NOT NULL DEFAULT '[]'"];
			await this.provider.createTable('starboard', SQLCreate);
		}
	}

};
