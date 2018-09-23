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

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 6,
			requiredPermissions: ['BAN_MEMBERS'],
			runIn: ['text'],
			description: 'Bans a mentioned user. Currently does not require reason (no mod-log).',
			usage: '<member:user> [reason:string] [...]',
			usageDelim: ' '
		});
	}

	async run(message, [user, ...reason]) {
		if (user.id === message.author.id) throw 'Why would you ban yourself?';
		if (user.id === this.client.user.id) throw 'Have I done something wrong?';

		const member = await message.guild.members.fetch(user).catch(() => null);
		if (member) {
			if (member.roles.highest.position >= message.member.roles.highest.position) throw 'You cannot ban this user.';
			if (!member.bannable) throw 'I cannot ban this user.';
		}

		const options = {};
		reason = reason.length ? reason.join(' ') : null;
		if (reason) options.reason = reason;

		await message.guild.members.ban(user, options);
		return message.sendMessage(`${member.user.tag} got banned.${reason ? ` With reason of: ${reason}` : ''}`);
	}

};
