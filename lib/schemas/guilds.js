const { Client } = require('klasa');

Client.defaultGuildSchema
	.add('autoAssignRole', 'role')
	.add('customCommands', 'any', { array: true, configurable: false })
	.add('music', folder => folder
		.add('playlist', 'any', { array: true, configurable: false }))
		.add('repeatOne', 'boolean', { configurable: false })
		.add('repeatPlaylist', 'boolean', { configurable: false });
