module.exports = {
    name: 'prefix',
    description: `Change the prefix of my commands.`,
    async execute(message, args, config) {
        if(!args[1] || args[2]!=undefined) return message.channel.send(`Use \`${config.getGlobal().prefix}config prefix {new_prefix}\` to run this command correctly`);
        const new_prefix = args[1];
        config.applyChanges("global", "prefix", new_prefix);
        return message.channel.send(`Prefix succesfuly changed to \`${new_prefix}\``);
    }
}