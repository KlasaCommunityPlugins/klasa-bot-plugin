const { Client: { plugin } } = require('klasa');

module.exports = {
	[plugin]() {
		this.arguments.registerCoreDirectory('./arguments/');
		this.commands.registerCoreDirectory('./commands/');
		this.events.registerCoreDirectory('./events');
		this.extendables.registerCoreDirectory('./extendables');
		this.finalizers.registerCoreDirectory('./finalizers');
		this.inhibitors.registerCoreDirectory('./inhibitors');
		this.languages.registerCoreDirectory('./languages');
		this.tasks.registerCoreDirectory('./tasks');
	}
};
