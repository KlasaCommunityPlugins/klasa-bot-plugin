const { Command } = require('klasa')



module.exports = class extends Command {

  constructor (...args) {

    super(...args, {

      aliases: [],

      permLevel: 7,

      description: 'Delete a modlog by its ID Number',

      quotedStringSupport: false,

      usage: '[id:int]',

      usageDelim: ' '

    })

  }



  async run (msg, [id]) {

    if (!id) return msg.reply('You did not provide any Mod Log ID #. Please try again.')

    const { modlogs } = msg.guildConfigs

    const logExists = modlogs.filter(log => log.id === id)

    if (logExists.length === 0 || !logExists) return msg.reply('Sorry that ID number was not found in the log history. Please try again.')

    const obj = modlogs.find(log => log.id === id)



    await msg.guild.configs.update('modlogs', obj, msg.guild)



    return msg.reply(`The modlog with the id of **${id}** has been removed.`)

  }



  async init () {



  }

}
