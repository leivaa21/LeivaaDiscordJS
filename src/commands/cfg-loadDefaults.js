module.exports = {
      name: 'loadDefaults',
      description: `Set the configs all by default.`,
      async execute(message, args, config) {
        if(args[1] == undefined) 
            return message.channel.send(`Use \`${config.getGlobal().prefix}config loadDefaults {all/global/reactionRole}\` to run this command correctly`);
        const option = args[1].toLowerCase();
        if(option != "all" && option != "global" && option!="reactionrole")
            return message.channel.send(`Use \`${config.getGlobal().prefix}config loadDefaults {all/global/reactionRole}\` to run this command correctly`);
        config.loadDefaults(option);
        return message.channel.send(`\`Defaults configs\` loaded succesfuly`);
      }
  }