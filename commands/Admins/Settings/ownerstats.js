const { Command, version: klasaVersion, Duration } = require('klasa');
const { version: discordVersion, MessageEmbed } = require('discord.js')
const { settings: { prefix } } = require('../../../../config/config.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description:'Here, the bot owner can look over his stats, and other things he needs.',
			permissionLevel: 10,
			aliases: ['os']
		});
	}

	async run(message) {
		
	const embed1 = new MessageEmbed()
		.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
		.setColor(7415665)
		.addField(`Memory Usage:`,  (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),true)
		.addField(`Uptime:`, Duration.toNow(Date.now() - (process.uptime() * 1000)),true)
		.addField(`Server count:`, `${this.client.guilds.size}`,true)
		.addField(`Player/User count:`,` ${this.client.users.size}`,true)
		.addField(`Owner:`, (this.client.owner),true)
		.addField(`Default Prefix:`,(prefix),true)
		.addField(`Klasa Version:`,klasaVersion,true)
		.addField(`Discord.js Version:`, discordVersion,true)
		.addField(`Node.js Version`, process.version,true)
		message.send(embed1)
    }
}