/*
MIT License

Copyright (c) 2017-2018 dirigeants

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const { Command, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

const verificationLevels = [ 'None', 'Low', 'Medium', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻' ];

const filterLevels = [ 'Off', 'No Role', 'Everyone' ];
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['guild'],
			description: 'Get information on the current server.'
		});

		this.timestamp = new Timestamp('d MMMM YYYY');
	}

	run(message) {
		return message.sendEmbed(new MessageEmbed()
			.setColor(0x00AE86)
			.setThumbnail(message.guild.iconURL())
			.addField('❯ Name', message.guild.name, true)
			.addField('❯ ID', message.guild.id, true)
			.addField('❯ Creation Date', this.timestamp.display(message.guild.createdAt), true)
			.addField('❯ Region', message.guild.region, true)
			.addField('❯ Explicit Filter', filterLevels[message.guild.explicitContentFilter], true)
			.addField('❯ Verification Level', verificationLevels[message.guild.verificationLevel], true)
			.addField('❯ Owner', message.guild.owner ? message.guild.owner.user.tag : 'None', true)
			.addField('❯ Members', message.guild.memberCount, true));
	}

};
