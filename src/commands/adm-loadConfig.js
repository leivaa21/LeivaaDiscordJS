module.exports = {
      name: 'adm-loadConfig',
      description: `Load the backup previously saved.`,
      async execute(message, args, config) {
        if(args[0] == undefined) 
            return message.channel.send(`Use \`${config.getGlobal().prefix}loadConfig {all/global/reactionRole}\` to run this command correctly`);
        const option = args[0].toLowerCase();
        if(option != "all" && option != "global" && option!="reactionrole")
            return message.channel.send(`Use \`${config.getGlobal().prefix}config {all/global/reactionRole}\` to run this command correctly`);
        config.loadSaved(option);
        return message.channel.send(`\`Saved configs\` loaded succesfuly`);
      }
  }