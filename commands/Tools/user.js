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

const statuses = {
	online : '💚 Online',
	idle   : '💛 Idle',
	dnd    : '❤ Do Not Disturb',
	offline: '💔 Offline'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Get information on a mentioned user.',
			usage      : '[member:member]'
		});

		this.timestamp = new Timestamp('d MMMM YYYY');
	}

	run(message, [member = message.member]) {
		return message.sendEmbed(new MessageEmbed()
			.setColor(member.displayHexColor || 0xFFFFFF)
			.setThumbnail(member.user.displayAvatarURL())
			.addField('❯ Name', member.user.tag, true)
			.addField('❯ ID', member.id, true)
			.addField('❯ Discord Join Date', this.timestamp.display(member.user.createdAt), true)
			.addField('❯ Server Join Date', this.timestamp.display(member.joinedTimestamp), true)
			.addField('❯ Status', statuses[member.presence.status], true)
			.addField('❯ Playing', member.presence.activity ? member.presence.activity.name : 'N/A', true)
			.addField('❯ Highest Role', member.roles.size > 1 ? member.roles.highest.name : 'None', true)
			.addField('❯ Hoist Role', member.roles.hoist ? member.roles.hoist.name : 'None', true));
	}

};
