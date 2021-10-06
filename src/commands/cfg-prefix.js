import {replace} from 'replace-json-property'
module.exports = {
    name: 'prefix',
    description: `Change the prefix of my commands.`,
    async execute(message, args, config) {
        if(!args[1] || args[2]!=undefined) return message.channel.send(`Use \`${config.prefix}config prefix {new_prefix}\` to run this command correctly`);
        const new_prefix = args[1];
        replace(__dirname + "/../configs/config.json", "prefix", new_prefix);
        return message.channel.send(`Prefix succesfuly changed to \`${new_prefix}\``);
    }
}