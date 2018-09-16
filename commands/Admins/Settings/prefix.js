const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: [],
			promptLimit: 0,
			permissionLevel: 6,
			description: 'Change the prefix of the bot for your server.',
			extendedHelp: [
				'To change the prefix of your server:',
				'',
				'<prefix>prefix newPrefix',
				'',
				'**__Example Use__**',
				'.prefix !'
			].join('\n'),
			usage: '[reset|prefix:str{1,10}]'
		});
	}

	async run(message, [prefix]) {
		if (prefix === 'reset') return this.reset(message);

		if (message.guild.settings.prefix === prefix) throw message.language.get('CONFIGURATION_EQUALS');

		await message.guild.settings.update('prefix', prefix);
		return message.sendMessage(`The prefix for this guild has been set to ${prefix}`);
	}

	async reset(message) {
		await message.guild.settings.update('prefix', this.client.options.prefix);
		return message.sendMessage(`Switched back the guild's prefix back to \`${this.client.options.prefix}\`!`);
	}

};
