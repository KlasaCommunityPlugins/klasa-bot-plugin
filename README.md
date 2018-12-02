# Klasa Bot Plugin

This plugin is meant to serve as a quick plugin to get a bot working with a ton of useful features.

# How To Use This Plugin

1. Open the terminal and type `npm i klasa-bot-plugin` or `yarn add klasa-bot-plugin`.
2. Find the file where you create the Klasa client. Usually an app.js or index.js file.
```js
const { token } = require('./config');
const { Client } = require('klasa');
Client.use(require('klasa-bot-plugin'));

new Client({
    fetchAllMembers: false,
    prefix: ';',
		commandEditing: true,
		commandLogging: true,
    typing: true,
    readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(token);
```

**Before** the new Client() add in this line `Client.use(require('klasa-bot-plugin'));
` and the plugin will be automatically activated enabling all the amazing features.

# Benefits of using this plugin

- Using the Klasa Pieces Repository is a bit difficult as you have to monitor when pieces are updated so you can have the latest features. With this plugin all you need do is `npm update` and it will update all the pieces for you.

- Many more additional amazing features will be added into this plugin so you can add in all these features easily.

# Included Features

- [x] Custom Commands that servers admins can create, list and remove on their servers.
- [x] Auto Assign Role to members that join the server.

## Arguments

Certain types of arguments are strict on how they require input. For example, to get a member you need to ask for a @member or member id. The arguments that are installed by this plugin will enable you to make your users so much happier.

For example, you can ask for a username and that would be converted automatically. You can ask for a role name, a channel name. These names will then be converted to a proper object.

- [x] Channel name
- [x] Member name
- [x] Role name
- [x] User name

## Commands

These are all the commands that come built in with this plugin.

### Admins - Discord Server Administrators

#### Settings

- [x] Prefix - Change or reset a servers prefix
- [x] Autoassignrole - Sets or remove a role to be automatically assigned when a member joins the server.

### Fun

- [x] rps - Play a game of rock, paper, scissors with the bot.
- [x] 8ball - Magic 8-Ball, does exactly what the toy does.
- [x] card - Draws some random cards from a deck.
- [x] catfacts -  Let me tell you a misterious cat fact.
- [x] choice - Makes a decision for you given some choices.
- [x] chucknorris -  Chuck Norris has some good jokes.
- [x] coinflip - Flips one or more coins
- [x] compliment - Compliments a user.
= [x] diceroll - Gives you a random dice roll from 1-10.
- [x] dogfacts -  Gives you a random dog fact.
- [x] horsefacts - Gives you a random horse fact
- [x] insult -
- [x] randquote - Returns a random message from someone in the channel.
- [x] shame - Rings a bell on the server shaming the mentioned person.
- [x] trumpquote - Returns a random Donald Trump quote.
- [x] urban -
- [x] wordcloud -
- [x] yomomma - Yo momma is so fat, yo.

### General

- [x] info - Provides some information about this bot.
- [x] invite - Displays the join guild link of the bot.
- [x] ping - Runs a connection test to Discord.
- [x] stats -  Provides some details about the bot and stats.
- [x] userconf - Define per-user settings.

#### Chat Bot Info

- [x] Help - Display help for a command.

### Misc

- [x] cat - Grabs a random cat image from random.cat.
- [x] dog - Grabs a random dog image from random.dog.
- [x] echo - Send a message to a channel through the bot.
- [x] fml -
- [x] starboard -
- [x] hug - Hugs the mentioned user and sends an image in chat.

### Moderation

- [x] ban - Bans a mentioned user. Currently does not require reason (no mod-log).
- [x] check -
- [x] kick - Kicks a mentioned user. Currently does not require reason (no mod-log).
- [x] mute - Mutes a mentioned member.
- [x] prune - Prunes a certain amount of messages w/o filter.
- [x] unban - Unbans a user.
- [x] unmute - Unmutes a mentioned user.
- [x] lockdown - Locks down the specified channel, stopping people from sending messages in it.

### System

- [x] exec - Execute commands in the terminal, use with EXTREME CAUTION.

#### Admin

- [x] eval - Evaluates arbitrary Javascript. Reserved for bot owner.
- [x] heapsnapshot - Creates a heapdump for finding memory leaks.

### Tools

- [x] followage* -
- [x] hastebin -
- [x] movie* -
- [x] price -
- [x] randomreddit -
- [x] remind -
- [x] roleinfo -
- [x] server -
- [x] subreddit -
- [x] topinvites -
- [x] tvshow* -
- [x] twitch* -
- [x] user -
- [x] wikipedia -
- [x] wolfram -


## Events

- [x] Rate Limit

## Extendables

### Message Extended
- [x] ask - You can ask the user a question and get a response with message.ask();
- [x] awaitReply -  Await a reply from a user with message.awaitReply();

### Text/DM Channels

- [x] fetchImage - Fetches the last image sent in the last 20 messages with channel.fetchImage();

## Finalizers

- [x] deleteCommand

## Inhibitors

- [x] requiredProviders

## Languages

- [x] German -
- [x] Spanish -
- [x] French -
- [x] Italian -
- [x] Romanian -
- [x] Turkish -

* Requires a little extra setup by you.

# Credits

- Skillz4Killz
- Klasa Pieces Repository
