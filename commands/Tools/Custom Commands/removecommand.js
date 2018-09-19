const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['rc'],
			permissionLevel: 6,
			description: 'Removes a custom commands for your server by its name.',
			usage: '(name:str)',
		});

		this.createCustomResolver('str', (arg, possible, message, params) => {
			if (!arg) return nessage,sendMessage('You did not provide a name of a custom command to remove.');
			const { customCommands } = message.guild.settings;
			if (customCommands.find(command => command.name === arg)) throw 'Could not find any custom command with that name.'
		});
	}

	async run(message, [name]) {
		const { customCommands } = message.guild.settings;
    const index = customCommands.findIndex(command => command.name === name);
    // update the database with the new command
    const { errors } = await message.guild.settings.update('customCommands', customCommands[index], { arrayPosition: index });
		if (errors.length) {
			this.client.emit('error', errors.join('\n'));
			return message.sendMessage(`The custom command could not be removed because of:\n\n${errors.join('\n')}`);
		}

		return message.sendMessage(`The ${name} custom command has been removed from the bot.`)
	}

};
