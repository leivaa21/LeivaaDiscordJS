module.exports = {
    name: 'welcomeMsg',
    description: `Change the welcome message.`,
    async execute(message, args, config) {

        if(!args[1]) 
            return message.channel.send(`Use \`${config.getGlobal().prefix}config welcomeMsg {new_msg}\` to run this command correctly`);
        
        const new_msg = message.content.slice(`${config.getGlobal().prefix}config welcomeMsg `.length);
        config.applyChanges("global", "welcomeMsg", new_msg);
        return message.channel.send(`Welcome message succesfuly changed to \`${new_msg}\``);
    }
}