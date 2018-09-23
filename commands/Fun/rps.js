const { Command } = require('klasa');

const possibilities = {
    rock: {
        rock: '✊, Oh man it is a tie!',
        paper: '✊, you just got lucky is all. 😢 You won\'t beat me again',
        scissor: '✊, I win! You lose! 💪'
    },
    paper: {
        rock: '✋, I win! You lose! 💪',
        paper: '✋, Oh man it is a tie!',
        scissor: '✋, you just got lucky is all. 😢 You won\'t beat me again'
    },
    scissor: {
        rock: '✌, you just got lucky is all. 😢 You won\'t beat me again',
        paper: '✌, I win! You lose! 💪',
        scissor: '✌, Oh man it is a tie!',
    },
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Play a game of rock, paper, scissor with the bot.',
            usage: '<rock|r|paper|p|scissor|s>'
        });
    }

    async run(message, [userAction]) {
				switch (userAction) {
					case 's':
						userAction = 'scissor';
					break;
				case 'p':
					userAction = 'paper';
					break;
				default:
					userAction = 'rock';
					break;
				}
        const botsAction = Object.keys(possibilities)[Math.floor(Math.random() * 3)];

				return message.sendMessage(possibilities[botsAction][userAction]);
    }

};
