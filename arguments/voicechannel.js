const { Argument } = require('klasa');
const { VoiceChannel } = require('discord.js');

module.exports = class extends Argument {

    run(arg, possible, message) {
			const voiceChannel = message.guild.channels.find(channel => channel instanceof VoiceChannel && channel.name === arg);

			if (voiceChannel) return voiceChannel;
			throw `I was unable to find the ${arg} voice channel on this server.`;
    }

};
