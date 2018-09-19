const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['lc'],
			permissionLevel: 6,
			description: 'Create custom commands you can allow users to be able to use',
			usage: '[name:str]',
		});

		this.createCustomResolver('name', (arg, possible, message, params) => {
			if (!arg) return arg;
			const { customCommands } = message.guild.settings;
			if (customCommands.find(command => command.name === arg)) throw 'Could not find any custom command with that name.'
		});
	}

	async run(message, [name]) {
		// If a specific command name is provided send back its content
		if (name) return message.sendMessage(message.guild.settings.customCommands.find(command => command.name === name).content);

		// If no command names are provided create a string of all command names
    const commandNames = message.guild.settings.customCommands.map(command => command.name).join('\n');

		if (!commandNames.length) return message.sendMessage('There are no custom commands on the server to list.');

		return message.sendMessage(`Your current custom commands are: \n\n${commandNames}`);
	}

};
