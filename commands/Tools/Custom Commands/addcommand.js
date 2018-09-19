const { Command } = require('klasa');
const util = require('./../../../lib/util');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			requiredSettings: [],
			aliases: ['ac'],
			permissionLevel: 6,
			description: 'Create custom commands you can allow users to be able to use',
			extendedHelp: 'No extended help available.',
			usage: '<name:str> <content:str> [...]',
			usageDelim: ' ',
		});

		this.customizeResponse('name', 'You did not provide a valid name to use for your custom command');

		this.customizeResponse('content', 'You did not provide any content for the command.')
	}

  async run(message, [name, ...content]) {
		// Check if the command already exists
		const { customCommands } = message.guild.settings;
		const commandExists = customCommands.find(command => command.name === name);
		if (commandExists) return message.reply('Sorry a custom command with this name already exists. Please try again.');

		const fullContent = content.join(' ');

		// If the string provided is JSON check if the json is valid
		if (fullContent[0] === '{') {
			const isValidJSON = await util.checkJson(fullContent)
			// If there was an error and it is not valid send the returned error
			if (typeof isValidJSON !== 'boolean') return message.sendMessage(isValidJSON);
		}

    const commandToStore = { name, content: fullContent };

		const { errors } = await message.guild.settings.update('customCommands', commandToStore);
		if (errors.length) {
			this.client.emit('error', errors.join('\n'));
			return message.sendMessage(`The command was unable to be saved because ${errors.join('\n')}`);
		}

    return message.sendMessage(`The **${name}** custom command has been added to the database.`);
  }


};
