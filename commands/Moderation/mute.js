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

const { Command, Duration } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 6,
			requiredPermissions: ['MANAGE_ROLES'],
			runIn: ['text'],
			description: 'Mutes a mentioned member.',
			usage: '[when:time] <member:member> [reason:string] [...]',
			usageDelim: ' '
		});
	}

	async run(message, [when, member, ...reason]) {
		if (member.id === message.author.id) throw 'Why would you mute yourself?';
		if (member.id === this.client.user.id) throw 'Have I done something wrong?';
		if (member.roles.highest.position >= message.member.roles.highest.position) throw 'You cannot mute this user.';
		if (member.roles.has(message.guild.settings.roles.muted)) throw 'The member is already muted.';
		if (!message.guild.settings.roles.muted) throw `You did not set a role to be used as the muted role. Please type **${message.guild.settings.prefix}conf set roles.muted @role** to set a role to be used to mute users on your server.`;

		await member.roles.add(message.guild.settings.roles.muted);

		if (!when) return message.sendMessage(`${member.user.tag} got muted.${reason.length ? ` With reason of: ${reason.join(' ')}` : ''}`);

		await this.client.schedule.create('unmute', when, { data: { guild: message.guild.id, user: member.id } });
		return message.sendMessage(`${member.user.tag} got temporarily muted for ${Duration.toNow(when)}.${reason ? ` With reason of: ${reason}` : ''}`);
	}

};
