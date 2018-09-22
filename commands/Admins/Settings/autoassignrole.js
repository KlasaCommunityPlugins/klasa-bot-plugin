const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['aar'],
			permissionLevel: 6,
			description: 'Choose a role to automatically assign to members joining',
			usage: '<role:rolename>',
		});
	}

	async run(message, [role]) {
		const alreadyAssigned = message.guild.settings.autoAssignRole === role;

		if (alreadyAssigned) return this.save(message, role, alreadyAssigned);

		const hasPermsToAssign = message.guild.me.roles.highest.position > role.position;

		if (!hasPermsToAssign) return message.sendMessage(`My highest role is not higher then ${role.name} so I am unable to add this role to others when they join. Please give me a role with a higher position or move the bots role up and try this command again.`);

		return this.save(message, role, alreadyAssigned);
	}

	async save(message, role, alreadyAssigned) {
		const { errors } = await message.guild.settings.update('autoAssignRole', role.id, message.guild);
		if (!errors.length) return message.sendMessage(`The ${role.name} has been ${alreadyAssigned ? 'removed from' : 'added to'} the auto-assign role.`);

		this.client.emit('error', errors.join('\n'));
		return message.sendMessage(`There was an error that occurred.\n\n${errors.join('\n')}`);
	}

};
