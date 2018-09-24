const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            requiredPermissions: ['MANAGE_CHANNELS'],
            permissionLevel: 6,
            runIn: ['text'],
            description: 'Stop/allow everyone from sending messages in a channel',
            usage: '<channel:channel> <reason:string> [...]',
            extendedHelp: 'Example: lockdown #channel <reason>',
            usageDelim: ' '
        });
    }

    async run(message, [channel, ...reason]) {
        reason = reason.join(' ');
        const everyoneRole = channel.guild.defaultRole;

        const needToDisablePerms = channel.permissionsFor(everyoneRole).has('SEND_MESSAGES');

        channel.updateOverwrite(everyoneRole, {
            SEND_MESSAGES: needToDisablePerms ? false : null
        }, reason || 'No reason specified.');

        return message.sendMessage(`Successfully ${needToDisablePerms ? 'locked down' : 'released'} the channel ${channel}${reason ? ', with reason: ' + reason : '.'}`);
    }
};
