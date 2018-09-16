const { Command, util } = require('klasa');

// Add to your schema definition:
// KlasaClient.defaultGuildSchema.add('minAccAge', 'integer', { default: 1800000 });

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: false,
			permissionLevel: 6,
			runIn: ['text'],
			requiredSettings: ['minAccAge'],
			description: 'Checks the guild for any user accounts younger than the minimum account age.'
		});
	}

	async run(message) {
		const accAge = message.guild.settings.minAccAge;
		const mtime = message.createdTimestamp;

		const users = [];
		for (const member of message.guild.members.values()) {
			if ((mtime - member.user.createdTimestamp) >= accAge) continue;
			users.push(`${member.user.tag}, Created:${((mtime - member.user.createdTimestamp) / 1000 / 60).toFixed(0)} min(s) ago`);
		}

		return message.sendMessage(users.length > 0 ?
			`The following users are less than the Minimum Account Age:${util.codeBlock('', users.join('\n'))}` :
			'No users less than Minimum Account Age were found in this server.');
	}

};
