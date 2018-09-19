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

- [x] 8ball -
- [x] banner -
- [x] card -
- [x] catfacts -
- [x] choice -
- [x] chucknorris -
- [x] coinflip -
- [x] compliment -
- [x] dogfacts -
- [x] faceapp* -
- [x] insult -
- [x] markov -
- [x] randquote -
- [x] shame -
- [x] trumpquote -
- [x] urban -
- [x] wordcloud -
- [x] yomomma -

### General

#### Chat Bot Info

- [x] Help -

### Misc

- [x] cat -
- [x] dog -
- [x] echo -
- [x] fml -
- [x] starboard -

### Moderation

- [x] ban -
- [x] check -
- [x] kick -
- [x] mute -
- [x] prune -
- [x] unban -
- [x] unmute -

### System

- [x] exec

#### Admin

- [x] eval
- [x] heapsnapshot

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
