const { Finalizer } = require('klasa');

// Add to your schema definition:
// KlasaClient.defaultGuildSchema.add('deleteCommand', 'boolean', { default: false });

module.exports = class extends Finalizer {

	async run(message) {
		if (message.guild && message.guild.settings.deleteCommand && message.deletable) await message.delete();
	}

};
