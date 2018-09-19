const { Event } = require('klasa');

module.exports = class extends Event {

	async run(member) {
		const { autoAssignRole } = member.guild.settings;

		if (!autoAssignRole) return null;

		const hasManageRoles = member.guild.me.hasPermission('MANAGE_ROLES');

		if (!hasManageRoles) return null;

		return member.roles.add(autoAssignRole);
	}

};
