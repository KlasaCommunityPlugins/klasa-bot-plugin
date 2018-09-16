const { Client: { plugin } } = require('klasa');

const mainDirectory = `${__dirname}/`;

module.exports = {

	[plugin]() {
		this.arguments.registerCoreDirectory(mainDirectory);
		this.commands.registerCoreDirectory(mainDirectory);
		this.events.registerCoreDirectory(mainDirectory);
		// this.extendables.registerCoreDirectory(mainDirectory);
		this.finalizers.registerCoreDirectory(mainDirectory);
		this.inhibitors.registerCoreDirectory(mainDirectory);
		this.languages.registerCoreDirectory(mainDirectory);
		this.tasks.registerCoreDirectory(mainDirectory);
	}
};
