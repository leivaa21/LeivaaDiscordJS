module.exports = {
      name: 'adm-saveConfig',
      description: `Save your actual configs on a backup file!.`,
      async execute(message, args, config) {
        if(args[0] == undefined) 
            return message.channel.send(`Use \`${config.getGlobal().prefix}saveConfig {all/global/reactionRole}\` to run this command correctly`);
        const option = args[0].toLowerCase();
        if(option != "all" && option != "global" && option!="reactionrole")
            return message.channel.send(`Use \`${config.getGlobal().prefix}saveConfig {all/global/reactionRole}\` to run this command correctly`);
        config.saveConfigs(option);
        return message.channel.send(`\`Actual configs\` saved succesfuly`);
      }
  }