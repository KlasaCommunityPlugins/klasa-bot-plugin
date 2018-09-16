const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 6,
			requiredPermissions: ['MANAGE_ROLES'],
			runIn: ['text'],
			description: 'Unmutes a mentioned user.',
			usage: '<member:member> [reason:string] [...]',
			usageDelim: ' '
		});
	}

	async run(message, [member, ...reason]) {
		if (member.roles.highest.position >= message.member.roles.highest.position) throw 'You cannot unmute this user.';
		if (!member.roles.has(message.guild.settings.roles.muted)) throw 'This user is not muted.';

		await member.roles.remove(message.guild.settings.roles.muted);

		return message.sendMessage(`${member.user.tag} was unmuted.${reason ? ` With reason of: ${reason}` : ''}`);
	}

};
