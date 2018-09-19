const { Client } = require('klasa');

Client.defaultGuildSchema
	.add('customCommands', 'any', { array: true, configurable: false });
