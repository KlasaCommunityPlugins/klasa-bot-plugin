const { Command } = require('klasa');
const everyone = channel.guild.defaultRole;

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            permissionLevel: 6,
            runIn: ['text'],
            description: 'Locks down the specified channel, stopping people from sending messages in it',
            usage: '<channel:channel> [reason:string] [...]',
            extendedHelp: 'Example: lockdown #channel <reason>',
            usageDelim: ' '
        });
    }

    async run(message, [channel, ...reason]) {
        reason = reason.join(' ');
 
        if (channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
            channel.updateOverwrite(everyone, {
                SEND_MESSAGES: false
            },
            `${reason ? reason : 'No reason specified.'}`);

            return message.channel.send(`Successfully locked down the channel ${channel}${reason ? ', with reason: ' + reason : '.'}`);
        } else {
            channel.updateOverwrite(everyone, {
                SEND_MESSAGES: null
            },
            `${reason ? reason : 'No reason specified.'}`);

            return message.channel.send(`Successfully released the lockdown from the channel ${channel}${reason ? ', with reason: ' + reason : '.'}`);
        }
    }
};